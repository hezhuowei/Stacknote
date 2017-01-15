/**
 * Created by hezhu on 2017/1/5.
 */
const app=require('electron').remote;
const fs=require('fs');
const Menu=app.Menu;
Menu.setApplicationMenu(null);

var fileloaded=false;
//document.getElementById("input_textbox").focus();
var main_data={
    "list_data":[],
    "recycle_bin_data":[]
}
$('#input_textbox').bind('keypress', function (event) {
    if (event.keyCode == "13") {
        add_list_item();
    }
});
/*------------------------------------文件读写部分-------------------------------*/

/*

 */
function save() {
    var filedata=JSON.stringify(main_data);
    fs.writeFile("D:\\stacknote\\data.json",filedata,function (err) {
        if(err)alert("无法保存文件");

    });

}

fs.readFile('D:\\stacknote\\data.json','utf-8',function (err,data) {
    if(err){
        alert("第一次使用，将在D:\\stacknote\\创建数据文件data.json")
    }
    else
    {
        main_data.list_data=JSON.parse(data).list_data;
        main_data.recycle_bin_data=JSON.parse(data).recycle_bin_data;
        for(let i in main_data.list_data) {
            //把json里面的数据加载到ui
            document.getElementById("list_box").innerHTML += "<li class=\"list-group-item\" onclick='delete_list_item()'>" + main_data.list_data[i] + "</li>";
        }
        fileloaded=true;
    }

})





/*----------------------------------插入新项----------------------------------*/

function add_list_item() {

    var input_text=document.getElementById("input_textbox").value;
    if (input_text!==""){
        main_data.list_data.unshift(input_text);                                                                                                         //JSON头部插入新项
        document.getElementById("list_box").innerHTML="<li class=\"list-group-item\" onclick='delete_list_item()'>"+input_text+"</li>"+document.getElementById("list_box").innerHTML; //列表上方插入新列
        document.getElementById("input_textbox").value="";
        document.getElementById("input_textbox").focus();
        save();
        anim_insert_item();


    }

    document.getElementById("input_textbox").focus();
}



/*-------------------------------------(任务完成时)顶项移入回收站------------------------------------------*/
function delete_list_item() {
    if(main_data.list_data[0]){
        anim_remove_item(del);      /*因为jquery动画是异步，所以要等jq完成了才执行删除逻辑。否则删除逻辑走完了jq动画才执行，就会对应不到相应删除项目。*/


    }
    document.getElementById("input_textbox").focus();

}
function del() {
    let list_top=main_data.list_data[0];
    main_data.recycle_bin_data.unshift(list_top);
    main_data.list_data.shift();
    let listBox=document.getElementById("list_box");
    listBox.removeChild(listBox.firstElementChild);
    if(main_data.recycle_bin_data.length>=30){
        for(let i=main_data.recycle_bin_data.length;i>=30;i--){
            main_data.recycle_bin_data.pop();
        }
    }
    save();
}
/*---------------------------------------恢复之前删除项----------------------------------------*/
function revoked() {
    if(main_data.recycle_bin_data[0]){
        let rec_data=main_data.recycle_bin_data[0];
        main_data.list_data.unshift(rec_data);
        document.getElementById("list_box").innerHTML="<li class=\"list-group-item\" onclick='delete_list_item()'>"+rec_data+"</li>"+document.getElementById("list_box").innerHTML;
        main_data.recycle_bin_data.shift();
        anim_insert_item();
        save();
    }
    document.getElementById("input_textbox").focus();



}
/*----------------------------------------------------------------------*/
