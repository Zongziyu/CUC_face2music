package utils;

import utils.CenterPane;
import utils.WEBView;
import javafx.event.EventHandler;
import javafx.scene.Node;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Line;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;
import javafx.scene.web.WebEngine;
//"file:///home/arron/Downloads/news.png"
public class CenterCell
{
	BorderPane main_ = new BorderPane();
	HBox main = new HBox();
	BorderPane left = new BorderPane();
	VBox center = new VBox();
	BorderPane info = new BorderPane();
	
	Text title;
	Text author;
	Text time;
	String url;
	public CenterCell(String title_, String url_, String time_, String author_, String imgURL, WebEngine webEngine)
	{
		url = url_;
		System.out.println(title_);
		main_.setMinSize(280, 70);
		main.setMinSize(280, 70);
		//main.getStyleClass().add("backgroundGray2");
		left.setMinSize(70, 70);
		center.setMinSize(270, 60);
		center.setMaxSize(270, 60);
		//center.getStyleClass().add("backgroundBlue");
		info.setMinSize(270, 10);
		info.setMaxSize(270, 10);
		
		/* string process */
		if(title_.length() > 20)
		{
			title_ = title_.substring(0,19)+"...";
		}
		if(author_.length()>10)author_ = author_.substring(0,9)+"..";
		if(time_.length()>10)time_ = time_.substring(0,9)+"..";
		title = new Text(title_);
		title.getStyleClass().addAll("text16","textBold");
		
		title.setTextAlignment(TextAlignment.LEFT);
		title.setWrappingWidth(270);
		
		author = new Text(author_);
		author.getStyleClass().addAll("text12");
		
		time = new Text(time_);
		time.getStyleClass().addAll("text12");
		
		info.setLeft(author);
		info.setRight(time);
		
		center.getChildren().add(new CenterPane(250,50,title).get());
		center.getChildren().add(info);
		
		Line bottomLine = new Line();
		bottomLine.setStartX(0);
		bottomLine.setStartY(0);
		bottomLine.setEndX(300);
		bottomLine.setEndY(0);
		bottomLine.setStroke(Color.rgb(255,255,255,.3));
		main.getChildren().addAll(new CenterPane(280,70,center).get());
		main.setOnMouseClicked(new EventHandler<MouseEvent>() {

	        @Override
	        public void handle(MouseEvent event)
	        {
	            if(event.getButton() == MouseButton.PRIMARY && event.getClickCount() == 2)
	            {	
	            	System.out.println("clicked");
	            }
	            else if(event.getButton() == MouseButton.PRIMARY && event.getClickCount() == 1)
	            {
	            	WEBView web = new WEBView(webEngine, url);
	    		    web.start();
	    		    web.run();
	            }               

	        }});
		main.setOnMouseEntered(new EventHandler<MouseEvent>() {

	        @Override
	        public void handle(MouseEvent event)
	        {
	        	System.out.println("entered");
	        	//main.getStyleClass().remove("backgroundGray2"); 
	            main.getStyleClass().add("backgroundGray2");            
	        }});
		main.setOnMouseExited(new EventHandler<MouseEvent>() {

	        @Override
	        public void handle(MouseEvent event)
	        {
	        	System.out.println("out");
	        	main.getStyleClass().remove("backgroundGray2");      
	        	//main.getStyleClass().add("backgroundGray2"); 
	        }});
	}
	
	public Node get()
	{
		return main;
	}
}
