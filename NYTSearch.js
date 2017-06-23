"use strict";
$(document).ready(function () {

      // API KEY USED: Article Search API Key: e865a20356864246baa66e27570ca353
      // API KEY NOT USED: Top Stories Search API Key: e865a20356864246baa66e27570ca353
      
      // CREATED ARRAY FOR THE "Number of Records Field" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      var numRecordsArr = [" ", "1", "5", "10"];
 
      // SEARCH BUTTON FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // This .on("click") function will trigger the AJAX Call.
      $("#searchBtn").on("click", function(event) {

        // Use the "event.preventDefault()"" to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked.
        event.preventDefault();

        // Getting Text From The Form's Input Fields. These Fields Are Our API Call Parameters.
        var searchTerm = $("#searchTerm").val().text().trim();
        var numRecords = $("#numRecords").val().text().trim();
        
        var sYear = $("#sYear").val() + "0101"; 
        var sYearQInput = sYear.text().trim();
        
        var eYear = $("#eYear").val() + "1231"; 
        var eYearQInput = eYear.text().trim();

        // API Call || Query URL || Gateway URL
        var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json&api-key=e865a20356864246baa66e27570ca353";
        
        queryURL += '?' + $.param ({
          // 'fq': source:("The New York Times"), // Not Used
          'q': searchTerm,
          'hits': numRecords,
          'begin_date': sYearQInput,
          'end_date': eYearQInput,
          'sort' : newest
        });
      });
      
        // AJAX Call and HTML Display of Selected JSON Data Fields
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
    
            console.log("The API Call Was Successful!");

            //FORMAT OUR JSON RESPONSE FIELDS BEFORE DISPLAYING THEM IN THE 
            //"TOP STORIES SECTION" OF OUR WEBPAGE
            
            var HLFormatted = $("<div>");
            HLFormatted.addClass("headline");
            HLFormatted.html(response.docs.headline.main);
           
            var PubDateFormatted = $("<div>");
            PubDateFormatted.addClass("pubdate")
            PubDateFormatted.html(response.docs.pub_date);
            
            var ArticleURLFormatted = $("<div>");
            ArticleURLFormatted.addClass("articleURL");  
            ArticleURLFormatted.html(response.docs.web_url);

            var topStoryDisplayed = $("<div>");
            HLFormatted + "<br/>" + PubDateFormatted + "<br/>" + ArticleURLFormatted + "<br/>";

            
            //USING THE "For Loop" As A Number Generator.
            for (var i = 1; i < numRecords + 1; i++) {

              var finalTopStoryDisplayed = i + topStoryDisplayed;
              $("#topArticles").append(finalTopStoryDisplayed);
              
            }              
            
        }).fail(function(response) {
            console.log("The API Call Failed.");
        });

          // CLEAR BUTTON FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          $("#clearBtn").on("click", function(event) {

            $("#searchTerm").empty();
            $("#numRecords").val() = numRecordsArr[0];
            $("#sYear").empty();
            $("#eYear").empty();
          
          }

});