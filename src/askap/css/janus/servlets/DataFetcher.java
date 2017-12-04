package askap.css.janus.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import askap.css.janus.util.Util;


/**
 * Fetches corresponding json files for the given type and merge them into one json list in the following format:
 *
 * [{
 *		"name": ":bul:fpga:temp",
 *		"description": "tempurature",
 *		"unit": "C"
 *	},
 *	{
 *		"name": ":bul:fpga:vccAux",
 *		"description": "Aux Voltage",
 *		"unit": "V"
 *	}
 * ]
 * 
 * If there is an error, return error json message:
 * 
 * {
 *   "status"  : "ERROR",
 *   "message" : "Type not supported"
 * }
 *  
 * @author wu049
 *
 */
public class DataFetcher extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private static Logger logger = Logger.getLogger(DataFetcher.class);
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DataFetcher() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String type = request.getParameter("type");
        String subsystem = request.getParameter("subsystem");

        JsonElement obj = getPVNames(type, subsystem);
        
        String json = new Gson().toJson(obj);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);		
	}
	
	private JsonElement getPVNames(String type, String subsystem) {
        JsonObject obj = new JsonObject();
        if (type==null || type.trim().isEmpty()) {
        	obj.addProperty("status", "ERROR");
         	obj.addProperty("message", "'type' not supplied");
         	
         	return obj;
        }
        if (subsystem==null || subsystem.trim().isEmpty()) {
        	obj.addProperty("status", "ERROR");
         	obj.addProperty("message", "'subsystem' not supplied");
         	
         	return obj;
        }
		
        
        String fileNames[] = Util.getPVFileNames(type, subsystem);
        if (fileNames==null || fileNames.length==0) {
        	obj.addProperty("status", "ERROR");
         	obj.addProperty("message", "No PVFileNames found for type: " + type);
         	
         	return obj;
        }
        
        try {
			return Util.mergeJsonFiles(fileNames);
		} catch (Exception e) {
			
			logger.error("Could not load pvfiles for " + type, e);
			
        	obj.addProperty("status", "ERROR");
         	obj.addProperty("message", "Could not load pvfiles for " + type + ": " + e.getMessage());
         	
         	return obj;
		}
	}
    
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	

}
