package application;

import utils.*;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.stage.Stage;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.TouchPoint.State;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;


public class Main extends Application {
	@Override
	public void start(Stage primaryStage) {
		try {
			final WebView browser = new WebView();
		    final WebEngine webEngine = browser.getEngine();
		    browser.resize(650, 600);
			browser.setMaxWidth(650);
			webEngine.setUserAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.94 Mobile Safari/537.36");
		    WEBView web = new WEBView(webEngine, "https;//www.baidu.com");
		    web.start();
		    web.run();
		    
		    LeftCell.sumOfArticles = 0;
		    
			HBox root = new HBox();
			Scene scene = new Scene(root,1200,600);
			primaryStage.setResizable(false);
			scene.getStylesheets().add(getClass().getResource("application.css").toExternalForm());
			
			VBox leftBoard = new VBox();
			VBox centerBoard = new VBox();
			
			leftBoard.setMinSize(250, 600);
			leftBoard.getStyleClass().add("backgroundWhite");
			HBox leftTop = new HBox();
			leftTop.setMinSize(250, 70);
			leftTop.getStyleClass().add("backgroundMain");
			Image img1 = new Image("file:///home/arron/eclipse-workspace/Rss/rss.png");
			ImageView icon1 = new ImageView();
			icon1.setImage(img1);
			icon1.setFitWidth(30);
			icon1.setSmooth(true);
			icon1.setCache(true);
			icon1.setPreserveRatio(true);
			Text title1 = new Text("ARTICLES");
			title1.getStyleClass().addAll("text18", "textBold");
			leftBoard.getChildren().add(leftTop);
			try
			{
				RssGet rss = new RssGet(leftBoard, centerBoard, webEngine);
			}catch(Exception e) {e.printStackTrace();}
			
			Text num = new Text(String.valueOf(LeftCell.sumOfArticles));
			num.getStyleClass().addAll("text18", "textBold");
			
			leftTop.getChildren().addAll(
					new CenterPane(60,70,icon1).get(),
					new CenterPane(150,70,title1).get(),
					new CenterPane(40,70,num).get());
			
			
			centerBoard.setMinSize(300, 600);
			centerBoard.getStyleClass().add("backgroundGray2");
			HBox centerTop = new HBox();
			centerTop.setMinSize(300, 40);
			centerTop.getStyleClass().add("backgroundGray2");
			Image img2 = new Image("file:///home/arron/eclipse-workspace/Rss/search.png");
			ImageView icon2 = new ImageView();
			icon2.setImage(img2);
			icon2.setFitWidth(20);http://www.w3cschool.cn
			icon2.setSmooth(true);
			icon2.setCache(true);
			icon2.setPreserveRatio(true);
			TextField searchBar = new TextField();
			searchBar.setMinSize(230, 30);
			searchBar.setMaxSize(230, 30);
			searchBar.setMaxHeight(30);
			centerTop.getChildren().addAll(
					new CenterPane(50,40,icon2).get(),
					new CenterPane(250,40,searchBar).get());
			centerBoard.getChildren().add(centerTop);
			try
			{
				centerBoard.getChildren().add(new Dom("",webEngine).get());
			}catch(Exception e) {e.printStackTrace();}
			BorderPane rightBoard = new BorderPane();
			rightBoard.setMinSize(650, 600);
			rightBoard.setCenter(browser);


			root.getChildren().addAll(leftBoard,centerBoard,rightBoard);
			
			primaryStage.setScene(scene);
			primaryStage.show();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	public static void main(String[] args) {
		launch(args);
	}
	
}
