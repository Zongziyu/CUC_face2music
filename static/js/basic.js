
/*
Left Board Generation
*******Start*******
 */
var left_list = document.getElementsByClassName("board");
var left_length = left_list.length;
var left_list_box = document.getElementById("left_list_box");
for(var i = 0; i < left_length; i++)
{
	left_list_box.innerHTML += "<div class='left-list-node' onclick='main_show("+i+")'><div class='"+left_list[i].childNodes[1].childNodes[1].getAttribute("class")+"'></div><div class='title left-list-node-title'>"+left_list[i].childNodes[1].childNodes[3].innerHTML+"</div></div>"; 
}


var default_num = 0;
var left_nodes = document.getElementsByClassName("left-list-node");
left_nodes[default_num].style.backgroundColor="#DDD";
function main_show(num)
{
	left_list[default_num].style.display="none";
	left_list[num].style.display = "block";
	left_nodes[default_num].style.backgroundColor="white";
	left_nodes[num].style.backgroundColor="#DDD";
	default_num = num;
}
/*

Left Board Generation
*********End************
 */


/*
Expandable 
*******Starting**********
 */
function expand(top)
{
	var next = top.nextElementSibling;
	if(! next.getAttribute("class")=="expand-board") return;
	if(top.getAttribute("expand")==0)
	{
		next.style.height = next.getAttribute("param")+"px";
		top.setAttribute("expand",1);
	}
	else
	{
		next.style.height = "0px";
		top.setAttribute("expand", 0);
	}
}

/*
Expandable 
*******End**********
 */

 /** status change***/
   function change_status(target, status){
        let target_ = $("#"+target+"_status");
        if(status == 0){
            target_.css("background-color","#ffaab1")
        }
        else{
            target_.css("background-color","#89cac4");
        }

   }
 /*****/

