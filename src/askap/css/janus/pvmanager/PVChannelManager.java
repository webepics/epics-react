package askap.css.janus.pvmanager;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.epics.pvaClient.PvaClient;
import org.epics.pvaClient.PvaClientChannel;
import org.epics.pvaClient.PvaClientGetData;
import org.epics.pvaClient.PvaClientPut;
import org.epics.pvaccess.client.Channel.ConnectionState;
import org.epics.pvdata.pv.Status;

import askap.css.janus.util.VTypeJsonConvert;
import askap.css.janus.websocket.Client;
import askap.css.janus.websocket.ResponseMessage;


public class PVChannelManager {

	private static Logger logger = Logger.getLogger(PVChannelManager.class);
	static Map<String, PvaClientChannel> pvChannelMap = new HashMap<String, PvaClientChannel>();
	
	private static PVChannelManager theChannelManager;
	
	PvaClient pvClient= PvaClient.get("pva ca");

	
	private PVChannelManager() {	
	}
	
	
	synchronized public static PVChannelManager getPVChannelManager() {
		if (theChannelManager==null) {
			theChannelManager = new PVChannelManager();
		}
		
		return theChannelManager;
	}

	public PvaClientChannel connect(String pvName) throws Exception {
//		return this.connect(pvName, "pva");
		return this.connect(pvName, "ca");
	}
	
	/**
	 * 
	 * @param pvName
	 * @param provider: 'pva' or 'ca'
	 * @return
	 * @throws Exception
	 */
	public PvaClientChannel connect(String pvName, String provider) throws Exception {
		
		synchronized (pvChannelMap) {
			PvaClientChannel channel = pvChannelMap.get(pvName);
			if ( channel == null) {
				channel = pvClient.createChannel(pvName, provider);
				pvChannelMap.put(pvName, channel);
				
				channel.issueConnect();
				Status status = channel.waitConnect(0.5);
				
				if (!status.isSuccess()) {
					logger.error("Could not connect to " + pvName + ": not connected");
					throw new Exception("Could not connect to " + pvName + ": not connected");
				}
			} else {
				ConnectionState connectionState = channel.getChannel().getConnectionState();
				if (!connectionState.equals(ConnectionState.CONNECTED)) {
					logger.error("Could not connect to " + pvName + ": not connected");
					throw new Exception("Could not connect to " + pvName + ": not connected");
				}			
			}
			return channel;
		}
	}

	public ResponseMessage getValue(String pvName) throws Exception {
		PvaClientGetData data = pvClient.channel(pvName, "ca").get().getData();
		ResponseMessage response = ResponseMessage.createValueMessage(-1, pvName, VTypeJsonConvert.PVToJson(data));
		
		return response;
	}
	
	
	public void subscriber(String pvName, Client monitor) throws Exception {
		
		synchronized (pvChannelMap) {
			
			PvaClientChannel channel = pvChannelMap.get(pvName);
			
			ConnectionState connectionState = channel.getChannel().getConnectionState();
			
			if ( channel==null || !connectionState.equals(ConnectionState.CONNECTED)) {
				throw new Exception("PV " + pvName + " not connected");
			}
			
			channel.monitor(monitor);
		}
	}
		
	public void write(String pvName, String jsonValue) throws Exception {
		PvaClientChannel channel = pvChannelMap.get(pvName);
		
		if (channel == null) 
			throw new Exception("PV " + pvName + " not connected");
		
		PvaClientPut putPV = channel.createPut();
		
		VTypeJsonConvert.jsonToPVData(jsonValue, putPV.getData());		
		putPV.put();		
	}
}
