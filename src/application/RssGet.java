package application;

import utils.LeftCell;
import java.io.*;

import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;

public class RssGet {
	BufferedReader reader;
	String FileUrl = "rss.txt";
	public RssGet(VBox leftBoard, VBox centerBoard, WebEngine webEngine)throws Exception
	{
		reader = new BufferedReader(new FileReader(FileUrl));
		//rssUrl,iconUrl,title
		String line;
		while( (line= reader.readLine()) != null)
		{
			int douhao = line.indexOf(",");
			String rssUrl = line.substring(0,douhao);
			int douhao2 = line.substring(douhao+1,line.length()).indexOf(",");
			String iconUrl = line.substring(douhao+1,line.length()).substring(0,douhao2);
			String title = line.substring(douhao + iconUrl.length()+2, line.length() );
			System.out.println(rssUrl);
			System.out.println(iconUrl);
			System.out.println(title);
			leftBoard.getChildren().add(new LeftCell(rssUrl, iconUrl, title,centerBoard, webEngine).get());
		}
		
	}
}
