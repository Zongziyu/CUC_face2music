<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="./css/zui.min.css">
<link rel="stylesheet" type="text/css" href="./css/utils.css">
<link rel="stylesheet" type="text/css" href="./css/login.css">
<meta charset="US-ASCII">
<title>Smellet</title>

<script type="text/javascript" src="./js/jquery.js"></script>
<script type="text/javascript" src="./js/zui.js"></script>

<%
String pwd = (String)request.getParameter("pwd");
if("helloworld".equals(pwd))
{
	%>
	<script type="text/javascript">
	window.location.href="./main.html";
	</script>
	<%
}
else
{
	%>
	<script type="text/javascript">
	new $.zui.Messager('Wrong PWD!!', {
        icon: 'bell', // 定义消息图标
        placement:'center'
    }).show();
	</script>
	
	<%
}
%>


</head>
<body>
<div class="top">

	<div class="title-1-board sub-top">
		<div class="title  title-1 color-white">Smellet</div>
	</div>

</div>

	<div class="board">
		<div class="title-1-board">
			<div class="title-icon line-height50 icon icon-user icon-2x">
			</div>
			<div class="title  title-1">Login</div>
		</div>
		<div class="main-board">
			<!--<img src="./pic/welcome.png" style="float:left;position:relative;top:-155px;left:-100px;">-->
			<div id="login_board">
				<div id="board_head">
					<img src="./pic/user.png" height="40px" width="40px">
				</div>
				<div id="board_body">
					<div id="body_img">
						<img style="border-radius:50px;" src="./pic/myicon.gif" height="100px" width="100px">
					</div>
					
					<div id="bottom_board">
						<form action="index.jsp" method="get" id="input_board">
							<div id="input_icon"></div>
							<input id="password_input" type="password" name="pwd">
							<button id="check_button" type="submit"> </button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>