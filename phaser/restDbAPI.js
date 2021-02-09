
    const APIKEY = "602135463f9eb665a16892a6";
    var leaderboardData;

    //get data from restDb
    function getData(){
        let setting = {
            "async": true,
            "crossDomain": true,
            "url": "https://typestormmania-c0cf.restdb.io/rest/leaderboard",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            }
        }
    

        //Display data retrieved from restDb
        $.ajax(setting).done(function (response) {
        
            leaderboardData = response;
    
            // for (var i = 0; i < response.length; i++) {
            //     /*
            //     content = `${content}<tr id='${response[i]._id}'><td>${response[i].rank}</td>
            //     <td>${response[i].name}</td>
            //     <td>${response[i].score}</td>
            //     <td>${response[i].dateTimeOfScore}
            //     <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' 
            //     class='update' data-id='${response[i]._id}' data-rank='${response[i].rank}' data-name='${response[i].name}' 
            //     data-score='${response[i].score}' data-dateTimeOfScore='${response[i].dateTimeOfScore}'>Update</a></td></tr>`;
            //     */
            //     console.log("Name: ", response[i].name);
            //     console.log("Score: ", response[i].score);
            //     console.log("Date time: ", response[i].dateTimeOfScore);
            //     content = response[i].name + "," + response[i].score + "," + response[i].dateTimeOfScore + "," + response[i].rank;
                
            // }
            /*
            $("#leaderboard tbody").html(content);
            $("#leaderboardList").html(response.length);*/
      
        });

        
    }
    getData();
    setTimeout(() => {
        console.log(leaderboardData);
    }, 3500);
    

