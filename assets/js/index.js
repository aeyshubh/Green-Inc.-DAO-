$('#add_user').submit(function(event){
    alert("Data Inserted Successfully!");
})

$('#update_user').submit(function(event){
    event.preventDefault();

    var unIndexedArray = $(this).serializeArray();
    var data={};
    
    $.map(unIndexedArray,function(n,i){
        data[n['name']]=n['value']
    })
    
    console.log(data)

    var request = {
        "url":`http://localhost:3000/api/user/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfuly!");
    })
})

if(window.location.pathname == "/"){
    $on_delete = $(".table tbody td a.delete");
    console.log("IN HERE")
    $on_delete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url":`http://localhost:3000/api/user/${id}`,
            "method":"DELETE"
        }
        
        if(confirm("Do you really want to delete this record.")){
                $.ajax(request).done(function(response){
                    alert("Record Deleted Successfully!");
                    location.reload()
                })
            }
        })
}