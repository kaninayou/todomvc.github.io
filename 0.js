window.onload = load;

 
//加载数据，转化为JavaScript对象
function transfor_javascripe()
{
    var get_local = localStorage.getItem("todo");//获取指定todo本地存储的值
    //接受服务器数据，一般是字符串数据
    //加载数据
    if(get_local==null)
    {
        return [];

    }
    else
    {
        //加载加载数据不为空
        return JSON.parse(get_local);//将数据转化为javascripe对象
    }
    
    // return JSON.parse(get_local);
}
 
 //用户的数据保存到本地缓存
function down_local(data)
{
    //向web服务器发送数据，需要是字符串
    var data_t1=JSON.stringify(data)//把JavaScript转化为字符串
    localStorage.setItem("todo",data_t1);//把后半部分的字段存储到todo
    //localStorage.getItem("todo");
}
 
//每次加载。读到空数据，队列，计数都不受影响
function get_E_empty()
{
    var test_1=document.getElementById('todolist');//要做的事的列表不需要添加任何东西
        test_1.innerHTML= '';
      
        test_1=document.getElementById('todocount');//不进行操作，数字不发生变化
        test_1.innerText= 0;
      
        test_1=document.getElementById('donelist');
        test_1.innerHTML= '';
      
        test_1=document.getElementById('donecount');
        test_1.innerText= 0;
}
//要做的项目添加到列表，计数++
function get_E_nonull(todo_item,num_todo,over_item,num_over)
{
    var test_1=document.getElementById('todolist');//要做的列表增加
    test_1.innerHTML= todo_item;
  
    test_1=document.getElementById('todocount');//数字用上面的计算结果
    test_1.innerText= num_todo;
  
    test_1=document.getElementById('donelist');//以经做的项目列表
    test_1.innerHTML= over_item;
  
    test_1=document.getElementById('donecount');//已经做的的个数
    test_1.innerText= num_over;
}

//每次用户进行输入都会进行加载
function load()
{    
    var get_local=localStorage.getItem("todo");//获取指定todo本地存储的值
    //如果读取到了空的数据
    if(get_local == null)
    {
        get_E_empty();
    }

    if(get_local != null)//不为空的情况下
    {
        var data = JSON.parse(get_local);//将数据转化为javascripe对象
        //设置要做的和已经做的项目
        var todo_item = "";
        var over_item = "";

        //计数，初始时都是0
        var num_todo = 0; 
        var num_over = 0;
        
        var i=0;
        var a1=data.length;//数据一共多少个字符，循环多少次
        //数据一共多少个字符，循环多少次
        for(i;i<a1;i++)
        {
            if(data[i].done)//如果第i个任务已经完成
            {
               
                over_item +=  "<li>"
                    + "<input type='checkbox' "
                    + "onchange='javascript:replace("+i+",\"done\",false"+")' checked='checked'>"
                    + "<p id='p-"+i+"' onclick='javascript:input_item("+i+")'>"+data[i].title+"</p>"
                    + "<a href='javascript:drop_onechar("+i+")'>X</a>"
                    + "</li>";
                num_over ++;//完成的计数+1
            }
            
            else
            {
                todo_item += "<li>"
                + "<input type='checkbox' onchange='javascript:replace("+i+",\"done\",true"+")'> "
                + "<p id='p-"+i+"' onclick='javascript:input_item("+i+")'>"+data[i].title+"</p>"
                + "<a href='javascript:drop_onechar("+i+")'>X</a>"
                + "</li>";
                
                
                num_todo ++;//要做的计数+1
            }
        }

        //对应非空
        get_E_nonull(todo_item,num_todo,over_item,num_over);
     
    }
    
}

//对上面的函数进行调用
function control_all()
{
    var title = document.getElementById('title');
    if(title.value != '')//输入的不是空才进行操作
    {
        //如果输入的不是空
        var data = transfor_javascripe();//转化为JavaScript对象
        var todo = {"title":title.value,"done":0};
        data.push(todo);//末尾添加从而改变原数组
        down_local(data);
        //保存到本地
        load();//加载
    }
    else
    {
        //do nothing
    }
}

//执行清除功能
function clear()
{
    localStorage.clear();//执行删除
    load();
}
 
//删除一个字
function drop_onechar(i)
{
    var data = transfor_javascripe();//数据转化为JavaScript对象
    data.splice(i,1)[0];//删除其中的第i个
    down_local(data);//保存到本地
    load();//每次都需要加载
}
 
//更新现在的状态
function replace(i,j,value)
{
    var data = transfor_javascripe();
    //上面和下面是一个流程，先转化为JavaScript对象
    var a1 = data.splice(i,1)[0];//删除函数，删除第i个
    a1[j] = value;
    data.splice(i,0,a1);//删除为0，添加新项目
    //下面与上面对应，保存到本地缓存
    down_local(data);//保存到本地
    //更新
    load();
}
 
 //输入要添加的项目
function input_item(i)
{
    var input_test = document.getElementById("input_test-"+i);//设置input_test临时使用
    var input = document.getElementById("input-"+i);
    //输入读取
    title = input_test.innerHTML;//暂时储存
    input_test.innerHTML="<input id='input-"+i+"' value='"+title+"' />";//设置表格行的开始和结束间的


    //设置长度
    var text_len=input.value.length//长度
    input.setSelectionRange(0,text_len);//选择从头开始长度的量
  
    //每次用户输入的事件的处理函数
    input.onblur = function()//当用户离开框时执行这段函数
    {
        if(input.value != '')//当输入的不是空
        {

            replace(i,'title',input.value);
        }
        else
        {
            //不能执行非空的情况
        }
    };
}
 

