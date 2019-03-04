package application;

import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.sun.syndication.feed.synd.SyndCategory;
import com.sun.syndication.feed.synd.SyndContent;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;

import javafx.scene.control.ScrollPane;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import utils.CenterCell;
import utils.WEBView;

public class Dom {
	ScrollPane pane = new ScrollPane();
	VBox box = new VBox(); 
	int size;
	public Dom(String rssLink,WebEngine webEngine) throws Exception
	{
		/*Pane Settings */
		pane.setMinSize(300,560);
		pane.setMaxSize(300, 560);
		box.setMinSize(280,560);
		box.setMaxWidth(280);
		pane.setContent(box);
		if(rssLink == "")return;
		URL feedUrl = new URL(rssLink);
		
		SyndFeedInput input = new SyndFeedInput();
		SyndFeed feed = input.build(new XmlReader(feedUrl));
		
		 // 得到Rss新闻中子项列表     
        List entries = feed.getEntries();  
        // 循环得到每个子项信息  
        size = entries.size();
        for (int i = 0; i < entries.size(); i++) {  
        	SyndEntry entry = (SyndEntry) entries.get(i);  
            String title = entry.getTitle();
            String link = entry.getLink();
              
            // 标题、连接地址、标题简介、时间是一个Rss源项最基本的组成部分     
//            "标题：" + entry.getTitle());  
//            "连接地址：" + entry.getLink());  
            SyndContent description = entry.getDescription();  
            String author = entry.getAuthor();
            String pubDate = String.valueOf(entry.getPublishedDate());
//            "标题简介：" + description.getValue());  
//            "发布时间：" + entry.getPublishedDate());  
              
              
            // 以下是Rss源可先的几个部分     
            System.out.println("标题的作者：" + entry.getAuthor());  
              
            // 此标题所属的范畴     
//            List categoryList = entry.getCategories();  
//            if (categoryList != null) {  
//                for (int m = 0; m < categoryList.size(); m++) {  
//                    SyndCategory category = (SyndCategory) categoryList.get(m);  
//                    System.out.println("此标题所属的范畴：" + category.getName());  
//                }  
//            } 
            if(i==0) {WEBView web = new WEBView(webEngine,link);web.start();web.run();}
        	box.getChildren().add(new CenterCell(title,link,pubDate,author,"file:///home/arron/Downloads/news.png", webEngine).get());
        }
	}
	public int getSize()
	{
		return size;
	}
	public ScrollPane get()
	{
		return pane;
	}
	
}
