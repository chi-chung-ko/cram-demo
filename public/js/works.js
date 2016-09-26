var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;

manageData();

function manageData() {
    $.ajax({
        type : 'GET',
        url : url,
        data : {page:current_page},
        dataType : 'json'
    }).done(function (data) {
        // console.log(data);
        total_page = data.last_page;

        $('#pagination').twbsPagination({
            totalPages: total_page,
            visiblePages: 5,
            first: '',
            last: '',
            prev: '&laquo;',
            next: '&raquo;',
            onPageClick: function (event, page) {
                current_page = page;
                if(is_ajax_fire != 0){
                    getPageData();
                }
            }
        });

        manageRow(data.data);
        is_ajax_fire = 1;
    });
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

/* Get Page Data*/
function getPageData() {
    $.ajax({
        type: 'GET',
        url: url,
        data: {page:current_page},
        dataType: 'json'
    }).done(function(data){
        manageRow(data.data);
    });
}

function manageRow(data) {
    var rows = '';
    $.each(data, function (key, value) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+ value.name +'</td>>';
        rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-work-modal" class="btn btn-info edit-work">修改 </button> ';
        rows = rows + '<button class="btn btn-danger remove-work"> 刪除</button>';
        rows = rows + '</td>';
        rows = rows + '</tr>';
    });
    $("tbody").html(rows);
}

$("#create-work").submit(function(e){
    e.preventDefault();
    var form_action = $("#create-work").attr("action");
    var name = $("#create-work").find("input[name='name']").val();

    $.ajax({
        type:'POST',
        url: form_action,
        data:{name: name},
        dataType: 'json'
    }).done(function (data) {
        $("#create-work").find("input[name='name']").val('');
        getPageData();
    });
});

/* Edit Category */
$("body").on("click",".edit-work",function () {
    var id = $(this).parent("td").data('id');
    var name = $(this).parent("td").prev("td").text();
    $("#edit-work").find("input[name='name']").val(name);
    $("#edit-work").attr("action",url + '/' + id);
});

$("#edit-work").submit(function(e){
    e.preventDefault();
    var form_action = $("#edit-work").attr("action");
    var name = $("#edit-work").find("input[name='name']").val();

    $.ajax({
        type:'PUT',
        url: form_action,
        data:{name: name},
        dataType: 'json'
    }).done(function (data) {
        getPageData();
        $('.modal').modal('hide');
    });
});

/* Remove Category */
$("body").on("click",".remove-work",function(){
    var id = $(this).parent("td").data('id');
    var rows = $(this).parent("tr");
    swal({
        title: "你確定要刪除嗎？",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "確定",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            url: url + '/' + id,
            type: 'delete',
            dataType: 'json'
        }).done(function (data) {
            rows.remove();
            getPageData();
        });
    });
});



