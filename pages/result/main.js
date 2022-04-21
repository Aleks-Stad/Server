const api_results = new XMLHttpRequest();
api_results.open("GET", "/api/game", true);
api_results.send()


api_results.onreadystatechange = function () {
    if (api_results.readyState == 4 && api_results.status == 200) {
        table_result = document.querySelector(".result");
        jResult = JSON.parse(api_results.responseText);

        for (var i = 0; i < jResult.length; i++) {
            var element = jResult[i];
            table_result.innerHTML += `<tr><td>${element.id}</td> <td>${element.winnerId}</td> <td>${element.loserId}</td></tr>`;
        }
    }
}

function delete_res(){
    api_results.open("DELETE", "/api/game", true)
    api_results.send();
    location.reload();

}