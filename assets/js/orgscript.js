$('#update_org').submit(function(event){
    event.preventDefault();

    var unIndexedArray = $(this).serializeArray();
    var data={};
    
    $.map(unIndexedArray,function(n,i){
        data[n['name']]=n['value']
    })
    
    console.log(data)

    var request = {
        "url":`http://localhost:3000/api/org/${data.org_id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfuly!");
    })
})