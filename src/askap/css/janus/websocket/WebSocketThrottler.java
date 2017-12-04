package askap.css.janus.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

public class WebSocketThrottler {
	
	HashMap<Session, List<String>> sessionMessages = new HashMap<Session, List<String>>();
	
	Thread senderThread;
	boolean keepGoing = true;
	
	public WebSocketThrottler() {
		senderThread = new Thread(new Runnable() {
			
			@Override
			public void run() {
				while (keepGoing) {
					HashMap<Session, List<String>> sendMessages = null;
					
					synchronized (sessionMessages) {
						sendMessages = (HashMap<Session, List<String>>) sessionMessages.clone();
						sessionMessages.clear();
					}
					
					
					for (Session session : sendMessages.keySet()) {
						List<String> messages = sendMessages.get(session);
						SocketRequestHandler.send(session, messages);
					}

					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		});
		
		senderThread.start();		
	}
	
	public void stop() {
		keepGoing = false;
	}
	
	public void sendMessage(Session session, String message) {
		synchronized (sessionMessages) {
			List<String> messages = sessionMessages.get(session);
			
			if (messages==null) {
				messages = new ArrayList<String>();
				sessionMessages.put(session, messages);
			}
			
			messages.add(message);			
		}
	}
	
	

}
