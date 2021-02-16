
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
      
        });

        
    }
    getData();
    setTimeout(() => {
        console.log(leaderboardData);
    }, 3500);
    

