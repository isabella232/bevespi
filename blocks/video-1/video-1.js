export default function decorate(block) {
  const section = `<div class="movie section">





    
        











  <link rel="stylesheet" href="/etc/designs/code/astrazeneca/moviegallery/clientlib.min.css" type="text/css">
  
  
  
  
  
  
  
  
  
  
  
  
  <script type="text/javascript" src="https://cdnsecakmi.kaltura.com/p/432521/sp/43252100/embedIframeJs/uiconf_id/30355282/partner_id/432521"></script>
  
  
  
        
          
                 <div id="default_1698655109852" style="display:none"> <img style="width:750px;" src="/content/dam/website-services/us/417-bevespi-consumer-rwd/images/global/bevespi-video-thumb.png" alt=""/></div>
          
        
         <div id="myEmbedTarget_0_440uxazg" style="width:750px;height:398px;">
              <span itemprop="thumbnail" content="/content/dam/website-services/us/417-bevespi-consumer-rwd/images/global/bevespi-video-thumb.png"></span>   
        </div>
      
  
  
  
  <input type="hidden" id="sc_eventName" value="event5"/>
  <input type="hidden" id="sc_enableTracking" value="false"/>
  <input type="hidden" id="sc_content" value="no content"/>
  <input type="hidden" id="sc_currentPagePath" value="/content/WebsiteServices/us/417-bevespi-consumer-rwd/en/us/how-to-use-bevespi-inhaler"/>
  <input type="hidden" id="sc_isAnonymous" value="true"/>
  <input type="hidden" id="sc_userId" value="null"/>
  <input type="hidden" id="closeLabel" name="closeLabel" value="">
  <input type="hidden" class="scrubbingDisabledPlayerId-0_440uxazg" value="">
  
  
  
  
  <div class="web_dialog_overlay_mvref" id="weboverlaymvref"></div>
  <div class="overlay_mvref" id="overlaymvref">
  <div>
  <p class="close"><a href="#" id="btnClosemdRef">X</a></p>
  </div>
  <br/>
  
  </div>
  <div class="movierefs">
  
  <ul>
  
      
  
  </ul>
  <div id="controlSequence" style="display:none">false</div>
  </div>
  
  <button class="resume-video btn btn-default" type="button" style="display:none;">Resume</button>                    
  <button class="replay-video btn btn-default" type="button" style="display:none;">Replay</button>
  <input type="hidden" id="entry_0_440uxazg" class="movie-id" value="movie-eid" rel="0_440uxazg">
  
  <script>
      var sc_user=document.getElementById("sc_userId").value;    
      var sc_contentpath=document.getElementById("sc_currentPagePath").value;
      var sc_contentName=document.getElementById("sc_content").value;
      var sc_event=document.getElementById("sc_eventName").value;
      var isAnonymous=document.getElementById("sc_isAnonymous").value;
      var isTrackingEnabled=document.getElementById("sc_enableTracking").value;
      if(navigator.userAgent.match(/iPad/i)) {
          var NativeDisabled = mw.getConfig('EmbedPlayer.EnableIpadHTMLControls');
          if(NativeDisabled){
              mw.setConfig('EmbedPlayer.EnableIpadHTMLControls', false); 
          }
      }
      /* CS-302 video performance issue related code changes done here.*/
      if(!mw.getConfig('EmbedPlayer.DisableEntryCache'))
       {
        mw.setConfig('EmbedPlayer.DisableEntryCache',true);
       }
  var overlayVideo = false;
  var imageClicked = false;
  window.addEventListener('DOMContentLoaded', function(){
  
         $("div.movie a.movie").click(function(){
        $("div.movie").removeClass("current-movie")			
             $(this).parents(".movie").addClass("current-movie");
         });
  if(overlayVideo){
  
      $("#myEmbedTarget_0_440uxazg").hide(); 
      $("#default_1698655109852").show();
  }    
  
      });
  
  var embedType = "";
  var enabelResumePlay = "false";
  var trackingIntervalTime = "5";
  var isVisited = false;
  var isPlayerPlayedPreviously = false;
  var isPlaybackProgressPreviously = false;
  window.kdp_current_entry_name;
  window.kdp_current_entry_id;
  window.kdp_current_entry_chapter_name=0;
  window.kdp_current_entry_references;
  window.kdp_current_entry_cuepoints;
  window.kdp_current_more_info_link;
  window.kdp_current_entry_cuepoints_ref_arr;
  window.kdp_current_ref_in_context = "";
  
  var isAlready25PercentExists = false;
  var isAlready50PercentExists = false;
  var isAlready75PercentExists = false;
  var isAlready100PercentExists = false;
  
  window.reached100 = false;
  var is70PercentPlayedArray = [];
  var is25PercentPlayedArray = [];
  var is50PercentPlayedArray = [];
  var is75PercentPlayedArray = [];
  var playerStartedArray = [];    
  var visitCount = 1;
  window.lb_reference_id = "ref0";
  window.ref_container = "div.timedfootnotes";
  window.ref_component = "div.timedfootnotes-container";
  var videoTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
  var videoPlaybackSession = "false";
  var entryIdCookieLife = (videoPlaybackSession == "true" ? 0 : 365); 
  
  window.addEventListener('DOMContentLoaded', function (){
    
    videoTitle=jQuery.trim(videoTitle);
    if(videoTitle==""){
     videoTitle="How to Use Your Inhaler - BEVESPI AEROSPHERE® (glycopyrrolate/formoterol fumarate) Inhalation Aerosol";
    }
    var video = {
                 title: videoTitle,
                 description: '',
                 link: '#',
                 movie: '//cdnsecakmi.kaltura.com/index.php/kwidget/wid/_432521/uiconf_id/30355282/entry_id/0_440uxazg',
                 thumbnail: '/content/dam/website-services/us/417-bevespi-consumer-rwd/images/global/bevespi-video-thumb.png',
                 played:false
                };
  
    
      var movieid;
      var thisPlayer;
      $(".resume-video").click(function(){
      if(typeof window.kdp.sendNotification == "function"){
              if($(".lightbox.overlay").length > 0){
          window.kdp.sendNotification("doPlay");
                  $(".resume-video,.replay-video").hide();
              }else{
           $(this).parent().find(".resume-video,.replay-video").hide();
              movieid = $(this).parent().find(".movie-id").attr("rel");
              thisPlayer = $("#myEmbedTarget_"+movieid).get(0);;
              thisPlayer.sendNotification("doPlay");
  
              }
          }
      });
  
      $(".replay-video").click(function(){
      if(typeof window.kdp.sendNotification == "function"){
               if($(".lightbox.overlay").length > 0){
           $(".resume-video,.replay-video").hide();
                   window.kdp.sendNotification("doSeek",0);
                   setTimeout(function(){
            window.kdp.sendNotification("doPlay");
                   },3000);
              }else{
                $(this).parent().find(".resume-video,.replay-video").hide();
          movieid = $(this).parent().find(".movie-id").attr("rel");
                thisPlayer = $("#myEmbedTarget_"+movieid).get(0);;
                thisPlayer.sendNotification("doSeek",0);
                  thisPlayer.sendNotification("doPlay");
              }
          }
      });
  
  
  
        jQuery("#btnShowModalmvRef").click(function (e)
        {
           ShowMedRefDialog(true);
           e.preventDefault();
        });
       /*CR - INC000003243486 Implementation of overlay image*/
        jQuery("#default_1698655109852").click(function (e)
        {
          jQuery("#default_1698655109852").hide();
          jQuery("#myEmbedTarget_0_440uxazg").show();
       imageClicked = true;
           
        if((navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPhone/i))) {
        $(".mwEmbedKalturaIframe").show();
                window.kdp.sendNotification("doPlay");
                window.kdp.sendNotification("doSeek", 0.1);
           }
        });
        
     });
  
  window.kdp = {};
  
  var embedTarget = document.getElementById('myEmbedTarget_0_440uxazg');
  if (embedTarget !== null) {
  
  if(embedType == "thumbEmbed"){
  
  
  
  
  kWidget.thumbEmbed({
      'targetId': 'myEmbedTarget_0_440uxazg',
      'wid': '_432521',
      'uiconf_id': '30355282',
      'entry_id': '0_440uxazg',
      'flashvars': { /* flashvars allows you to set runtime uiVar configuration overrides. */
          'externalInterfaceDisabled':false,'bumper.preSequence':'0','bumper.bumperEntryID':'','postbumper.postSequence':'0','postbumper.bumperEntryID':'','autoPlay':false,'watermark.plugin':true,'watermark.width':'100%','watermark.height':'100%','watermark.includeInLayout':false,'watermark.relativeTo':'video','watermark.position':'after','watermark.className':'Watermark','watermark.watermarkPosition':'','watermark.watermarkPath':'','watermark.watermarkClickPath':'','watermark.padding':'5'
      },
      'params': { /* params allows you to set flash embed params such as wmode, allowFullScreen etc*/
          'wmode': 'transparent',
          'allowFullScreen':'true',
      'allowNetworking':'all',
      'allowScriptAccess':'always',
      'bgcolor':'#000000'
      },
      'readyCallback': function(playerId) {
          window.kdp = $('#' + playerId).get(0);
          var actual_kdp = window.kdp;
          var imageUrl = "/content/dam/website-services/us/417-bevespi-consumer-rwd/images/global/bevespi-video-thumb.png"; 
       //kdp.setKDPAttribute("mediaProxy.entry", "thumbnailUrl", imageUrl); 
  
       kdp.kUnbind("mediaReady");
          kdp.kBind('mediaReady', function() {
  
              kdp_current_entry_name = kdp.evaluate("{mediaProxy.entry.name}");
              kdp_current_entry_id = kdp.evaluate("{mediaProxy.entry.id}");
              kdp_current_entry_duration = kdp.evaluate("{mediaProxy.entry.duration}");
              kdp_current_entry_references = kdp.evaluate("{mediaProxy.entryMetadata.ReferencesData}");
              kdp_current_entry_cuepoints = kdp.evaluate("{mediaProxy.entryCuePoints}");
  
  
        try{
                  if(typeof gddElAdvVideoProgressTrack == "function"){
            var videoCompletedTime = gddElAdvVideoProgressTrack($("#"+window.kdp.id),window.kdp_current_entry_id);
                      if(null != videoCompletedTime){
                              var watched_cookie_value=getCookie("entryId_"+window.kdp_current_entry_id);
                              if(null == watched_cookie_value || videoCompletedTime>watched_cookie_value){  
                                  setCookieKaltura("entryId_"+window.kdp_current_entry_id,videoCompletedTime,entryIdCookieLife);
                            }
                          }
                 }
        }catch(err) {
  
        }
        
        
              var watched_cookie_value = getCookie("entryId_" + kdp_current_entry_id);
              if (watched_cookie_value > 0){
                 kdp.sendNotification("doSeek", (watched_cookie_value / 1000) + .1);
                  if(window.AZ.Env.isUserLoggedIn && enabelResumePlay == "true"){
          var cmovie = $("#entry_"+window.kdp_current_entry_id).parents(".movie");
                      $(cmovie).find(".resume-video,.replay-video").show();
        
                  }       
              }
              if (imageClicked && watched_cookie_value == null) {
                  kdp.sendNotification("doPlay");
              }
  
              kdp_current_entry_cuepoints_arr = new Array();
              for (var a in kdp_current_entry_cuepoints) {
                  kdp_current_entry_cuepoints_arr.push([a,
                      kdp_current_entry_cuepoints[a][0].title
                  ])
              }
              kdp_current_entry_cuepoints_arr.sort(function(d, c) {
                  var f = d[0] * 1;
                  var e = c[0] * 1;
                  return ((f < e) ? -1 : ((f > e) ? 1 : 0))
              });
              if (kdp_current_entry_references !== null) {
                  createCPRefArray();
                  kdp_current_cuepoint = -1;
                  initReferences();
              } else {
                  $(ref_component).hide()
              }
  
          });
          kdp.kUnbind("playerUpdatePlayhead");
          kdp.kBind('playerUpdatePlayhead', function(a, b) {
          kdp_current_entry_duration = actual_kdp.evaluate("{mediaProxy.entry.duration}");
              var aType = "movie";
              var isRequired = "No";
        var fProduct = "";
        var fTherapyArea = "";
        var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
        var mType = "1";
              var dataToSend = "activityType=" + aType + "&mediaTitle=" + mTitle + "&mediaType=" + mType + "&finalProduct=" + fProduct + "&finalTherapyArea=" + fTherapyArea;
              /*var controlSequence = $CQ("#controlSequence").html();*/
              video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
              currentTime = a;
        var currentTimeRounded = Math.round(currentTime);
              progress_percentage = Math.round(currentTime / kdp_current_entry_duration * 100);
              current_in_milli_rounded = Math.round(currentTime * 1000);
              if((progress_percentage >= 25 && progress_percentage <= 27) && !(is25PercentPlayedArray.indexOf(mTitle) > -1)  && !isAlready25PercentExists){
               // SC call to capture specific percentage
         try {
             isAlready25PercentExists = true;
            playerProgress(progress_percentage,mTitle);
           }catch(err) {
            console.log(err.message); 
           }
           is25PercentPlayedArray.push(mTitle);
        }else if(progress_percentage >= 50 && progress_percentage<=52 && !(is50PercentPlayedArray.indexOf(mTitle) > -1) && isAlready25PercentExists && !isAlready50PercentExists){
           // SC call to capture specific percentage
           try {
             isAlready50PercentExists = true;
              playerProgress(progress_percentage,mTitle);
             }catch(err) {
              console.log(err.message); 
             }
             is50PercentPlayedArray.push(mTitle);
        }else if(progress_percentage == 70 && !(is70PercentPlayedArray.indexOf(mTitle) > -1)){
          // SC call to capture specific percentage
          if(isRequired == "Yes"){
            $.ajax({
              url: '/bin/globalActivityServlet',
              type: 'POST',
              dataType: 'json',
              data: dataToSend,
              success: function(){
  
              },
              error: function(){
  
              }
            });
          }
           is70PercentPlayedArray.push(mTitle); 
        }else if(progress_percentage >= 75 && progress_percentage<=77 && !(is75PercentPlayedArray.indexOf(mTitle) > -1) && isAlready25PercentExists && isAlready50PercentExists && !isAlready75PercentExists){
           // SC call to capture specific percentage
           try {
             isAlready75PercentExists = true;
              playerProgress(progress_percentage,mTitle);
             }catch(err) {
              console.log(err.message); 
             }
             is75PercentPlayedArray.push(mTitle);
        }
  
        try{
  
          if(((currentTimeRounded)%(trackingIntervalTime)) == 0 || progress_percentage == 100){
                      if(typeof gddElAdvVideoProgressUpdate == "function"){
                          gddElAdvVideoProgressUpdate($("#"+window.kdp.id),window.kdp_current_entry_id,current_in_milli_rounded);
                      }
          }  
  
        }catch(err) {
          // ignore if this method is not available
        }
  
              /* SC call to capture specific percentage*/
              /* playerProgress(progress_percentage);  */
              if (progress_percentage == 100) {
                  setCookieKaltura("entryId_" + window.kdp_current_entry_id, 0, entryIdCookieLife);
              } else {
                  setCookieKaltura("entryId_" + window.kdp_current_entry_id, current_in_milli_rounded, entryIdCookieLife);
              }
              syncReferences(current_in_milli_rounded);
              if (controlSequence == "true") {
                  syncChapters(current_in_milli_rounded);
              }
  
          });
          kdp.kUnbind("playerPaused");
          kdp.kBind('playerPaused', function() {
              if (visitCount == 1 || visitCount % 2 > 0) {
          var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
                  /* updated for SC code*/
                  video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
                  var current_in = getCookie("entryId_" + kdp_current_entry_id) / 1000;
                  console.log("currentin" + current_in);
                  var progress_percentage_pause = Math.round(current_in / kdp_current_entry_duration * 100);
                  console.log("pause %:::::" + progress_percentage_pause);
                  /* to call SC for Player paused - progress time*/
                  if (progress_percentage_pause > 0) {
            try {
                playerPaused(progress_percentage_pause,mTitle);
              }catch(err) {
                console.log(err.message); 
              }
                  }
                  $("#overlayrecomm").show();
                  $("#btnClosercom").click(function(e) {
                      HideDialogRcom();
                      e.preventDefault();
                  });
                  $("#recommendations").fadeIn(300);
                  if (modal) {
                      $("#overlayrecomm").unbind("click");
                  } else {
                      $("#overlayrecomm").click(function(e) {
                          HideDialogRcom();
                      });
                  }
              } else {
                  visitCount = visitCount + 1;
              }
          });
          kdp.kUnbind("playerPlayEnd");
          kdp.kBind('playerPlayEnd', function() {
        var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
        try {
               if(isAlready25PercentExists && isAlready50PercentExists && isAlready75PercentExists){
                isAlready25PercentExists = false;
                isAlready50PercentExists = false;
                isAlready75PercentExists = false;
                video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
                playerEnd(mTitle);
                   }
                   else{
              isAlready25PercentExists = false;
              isAlready50PercentExists = false;
              isAlready75PercentExists = false;
                 }	
               is25PercentPlayedArray = [];
              is50PercentPlayedArray = [];
              is75PercentPlayedArray = [];
            }catch(err) {
              console.log(err.message); 
            }
                try {
                      // changes for synagis elearning : end of video tracking
                      if(typeof bindTrackableElements == "function"){
                          bindTrackableElements($(this)); 
                      }
            }catch(err) {
              // ignore if this method is not available
            }
  
              setCookieKaltura("entryId_" + kdp_current_entry_id, '0', entryIdCookieLife);
              $("#overlayctoa").show();
              $("#btnClosectoa").click(function(e) {
                  HideDialogcToa();
                  e.preventDefault();
              });
              $("#calltoAction").fadeIn(300);
              if (modal) {
                  $("#overlayctoa").unbind("click");
              } else {
                  $("#overlayctoa").click(function(e) {
                      HideDialogcToa();
                  });
              }
          });
        kdp.kUnbind("playerPlayed");
        kdp.kBind('playerPlayed', function() {
              var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
              if (!(playerStartedArray.indexOf(mTitle) > -1)) {
          video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
          video.played = false;
          try {
                      console.log("Player Started @ Movie Dynamic inline ");
              trackVideoEvent(sc_user, sc_contentpath, sc_contentName, sc_event, video);
            }catch(err) {
              console.log(err.message); 
            }
                  video.played = true;
          playerStartedArray.push(mTitle);
              } 
          });
          kdp.kUnbind("doReplay");
          kdp.kBind('doReplay', function() {
        var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
          try {
            video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
            playerReplay(mTitle);
            updateProgressArray(is25PercentPlayedArray,mTitle);
            updateProgressArray(is50PercentPlayedArray,mTitle);
            updateProgressArray(is70PercentPlayedArray,mTitle);
            updateProgressArray(is75PercentPlayedArray,mTitle);
            }catch(err) {
              console.log(err.message); 
            }
          });
      }
  
  });
  
  }else{
  
  kWidget.embed({
      'targetId': 'myEmbedTarget_0_440uxazg',
      'wid': '_432521',
      'uiconf_id': '30355282',
      'entry_id': '0_440uxazg',
      'flashvars': { /* flashvars allows you to set runtime uiVar configuration overrides. */
          'externalInterfaceDisabled':false,'bumper.preSequence':'0','bumper.bumperEntryID':'','postbumper.postSequence':'0','postbumper.bumperEntryID':'','autoPlay':false,'watermark.plugin':true,'watermark.width':'100%','watermark.height':'100%','watermark.includeInLayout':false,'watermark.relativeTo':'video','watermark.position':'after','watermark.className':'Watermark','watermark.watermarkPosition':'','watermark.watermarkPath':'','watermark.watermarkClickPath':'','watermark.padding':'5'
      },
      'params': { /* params allows you to set flash embed params such as wmode, allowFullScreen etc*/
          'wmode': 'transparent',
          'allowFullScreen':'true',
      'allowNetworking':'all',
      'allowScriptAccess':'always',
      'bgcolor':'#000000'
      },
      'readyCallback': function(playerId) {
          window.kdp = $('#' + playerId).get(0);
          var actual_kdp = window.kdp;
            var imageUrl = "/content/dam/website-services/us/417-bevespi-consumer-rwd/images/global/bevespi-video-thumb.png"; 
        //kdp.setKDPAttribute("mediaProxy.entry", "thumbnailUrl", imageUrl); //
  
         kdp.kUnbind("mediaReady");
           kdp.kBind('mediaReady', function() {
              kdp_current_entry_name = kdp.evaluate("{mediaProxy.entry.name}");
              kdp_current_entry_id = kdp.evaluate("{mediaProxy.entry.id}");
              kdp_current_entry_duration = kdp.evaluate("{mediaProxy.entry.duration}");
              kdp_current_entry_references = kdp.evaluate("{mediaProxy.entryMetadata.ReferencesData}");
              kdp_current_entry_cuepoints = kdp.evaluate("{mediaProxy.entryCuePoints}");
  
  
        try{
                  if(typeof gddElAdvVideoProgressTrack == "function"){
            var videoCompletedTime = gddElAdvVideoProgressTrack($("#"+window.kdp.id),window.kdp_current_entry_id);
                      if(null != videoCompletedTime){
                              var watched_cookie_value=getCookie("entryId_"+window.kdp_current_entry_id);
                              if(null == watched_cookie_value || videoCompletedTime>watched_cookie_value){  
                                  setCookieKaltura("entryId_"+window.kdp_current_entry_id,videoCompletedTime,entryIdCookieLife);
                            }
                          }
                 }
        }catch(err) {
  
        }
        
        
              var watched_cookie_value = getCookie("entryId_" + kdp_current_entry_id);
              if (watched_cookie_value > 0){
                 kdp.sendNotification("doSeek", (watched_cookie_value / 1000) + .1);
                  if(window.AZ.Env.isUserLoggedIn && enabelResumePlay == "true"){
          var cmovie = $("#entry_"+window.kdp_current_entry_id).parents(".movie");
                      $(cmovie).find(".resume-video,.replay-video").show();
        
                  }       
              }
              if (imageClicked && watched_cookie_value == null) {
                  kdp.sendNotification("doPlay");
              }
  
              kdp_current_entry_cuepoints_arr = new Array();
              for (var a in kdp_current_entry_cuepoints) {
                  kdp_current_entry_cuepoints_arr.push([a,
                      kdp_current_entry_cuepoints[a][0].title
                  ])
              }
              kdp_current_entry_cuepoints_arr.sort(function(d, c) {
                  var f = d[0] * 1;
                  var e = c[0] * 1;
                  return ((f < e) ? -1 : ((f > e) ? 1 : 0))
              });
              if (kdp_current_entry_references !== null) {
                  createCPRefArray();
                  kdp_current_cuepoint = -1;
                  initReferences();
              } else {
                  $(ref_component).hide()
              }
  
          });
           kdp.kUnbind("playerUpdatePlayhead");
          kdp.kBind('playerUpdatePlayhead', function(a, b) {
          kdp_current_entry_duration = actual_kdp.evaluate("{mediaProxy.entry.duration}");
              var aType = "movie";
              var isRequired = "No";
        var fProduct = "";
        var fTherapyArea = "";
        var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
        var mType = "1";
        video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
              var dataToSend = "activityType=" + aType + "&mediaTitle=" + mTitle + "&mediaType=" + mType + "&finalProduct=" + fProduct + "&finalTherapyArea=" + fTherapyArea;
              /*var controlSequence = $CQ("#controlSequence").html();*/
              currentTime = a;
        var currentTimeRounded = Math.round(currentTime);
              progress_percentage = Math.round(currentTime / kdp_current_entry_duration * 100);
              current_in_milli_rounded = Math.round(currentTime * 1000);
              if((progress_percentage >= 25 && progress_percentage <= 27)&& !(is25PercentPlayedArray.indexOf(mTitle) > -1)  && !isAlready25PercentExists){
               // SC call to capture specific percentage
         try {
             isAlready25PercentExists = true;
            playerProgress(progress_percentage,mTitle);
           }catch(err) {
            console.log(err.message); 
           }
           is25PercentPlayedArray.push(mTitle);
              }else if((progress_percentage >= 50 && progress_percentage <=52) && !(is50PercentPlayedArray.indexOf(mTitle) > -1) && isAlready25PercentExists && !isAlready50PercentExists){
           // SC call to capture specific percentage
           try {
               isAlready50PercentExists = true;
              playerProgress(progress_percentage,mTitle);
             }catch(err) {
              console.log(err.message); 
             }
             is50PercentPlayedArray.push(mTitle);
        }else if(progress_percentage == 70 && !(is70PercentPlayedArray.indexOf(mTitle) > -1)){
          // SC call to capture specific percentage
          if(isRequired == "Yes"){
            $.ajax({
              url: '/bin/globalActivityServlet',
              type: 'POST',
              dataType: 'json',
              data: dataToSend,
              success: function(){
  
              },
              error: function(){
  
              }
            });
          }
           is70PercentPlayedArray.push(mTitle); 
        }else if(progress_percentage >= 75 && progress_percentage<=77 && !(is75PercentPlayedArray.indexOf(mTitle) > -1) && isAlready25PercentExists && isAlready50PercentExists && !isAlready75PercentExists){
           // SC call to capture specific percentage
           try {
               isAlready75PercentExists = true;
              playerProgress(progress_percentage,mTitle);
             }catch(err) {
              console.log(err.message); 
             }
             is75PercentPlayedArray.push(mTitle);
        }
  
        try{
  
          if(((currentTimeRounded)%(trackingIntervalTime)) == 0 || progress_percentage == 100){
                      if(typeof gddElAdvVideoProgressUpdate == "function"){
                          gddElAdvVideoProgressUpdate($("#"+window.kdp.id),window.kdp_current_entry_id,current_in_milli_rounded);
                      }
          }  
  
        }catch(err) {
          // ignore if this method is not available
        }
  
              /* SC call to capture specific percentage*/
              /* playerProgress(progress_percentage);  */
              if (progress_percentage == 100) {
                  setCookieKaltura("entryId_" + window.kdp_current_entry_id, 0, entryIdCookieLife);
              } else {
                  setCookieKaltura("entryId_" + window.kdp_current_entry_id, current_in_milli_rounded, entryIdCookieLife);
              }
              syncReferences(current_in_milli_rounded);
              if (controlSequence == "true") {
                  syncChapters(current_in_milli_rounded);
              }
  
          });
          kdp.kUnbind("playerPaused");
          kdp.kBind('playerPaused', function() {
              if (visitCount == 1 || visitCount % 2 > 0) {
          var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
                  /* updated for SC code*/
                  var current_in = getCookie("entryId_" + kdp_current_entry_id) / 1000;
                  console.log("currentin" + current_in);
                  var progress_percentage_pause = Math.round(current_in / kdp_current_entry_duration * 100);
                  console.log("pause %:::::" + progress_percentage_pause);
                  /* to call SC for Player paused - progress time*/
                  if (progress_percentage_pause > 0) {
            try {
              video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
                playerPaused(progress_percentage_pause,mTitle);
              }catch(err) {
                console.log(err.message); 
              }
                  }
                  $("#overlayrecomm").show();
                  $("#btnClosercom").click(function(e) {
                      HideDialogRcom();
                      e.preventDefault();
                  });
                  $("#recommendations").fadeIn(300);
                  if (modal) {
                      $("#overlayrecomm").unbind("click");
                  } else {
                      $("#overlayrecomm").click(function(e) {
                          HideDialogRcom();
                      });
                  }
              } else {
                  visitCount = visitCount + 1;
              }
          });
          kdp.kUnbind("playerPlayEnd");
          kdp.kBind('playerPlayEnd', function() {
        var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
        try {
          if(isAlready25PercentExists && isAlready50PercentExists && isAlready75PercentExists){
            isAlready25PercentExists = false;
            isAlready50PercentExists = false;
            isAlready75PercentExists = false;
            video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
            playerEnd(mTitle);
               }
               else{
          isAlready25PercentExists = false;
          isAlready50PercentExists = false;
          isAlready75PercentExists = false;
               }		
          is25PercentPlayedArray = [];
          is50PercentPlayedArray = [];
          is75PercentPlayedArray = [];
            }catch(err) {
              console.log(err.message); 
            }
                try {
                      // changes for synagis elearning : end of video tracking
                      if(typeof bindTrackableElements == "function"){
                          bindTrackableElements($(this)); 
                      }
            }catch(err) {
              // ignore if this method is not available
            }
  
              setCookieKaltura("entryId_" + kdp_current_entry_id, '0', entryIdCookieLife);
              $("#overlayctoa").show();
              $("#btnClosectoa").click(function(e) {
                  HideDialogcToa();
                  e.preventDefault();
              });
              $("#calltoAction").fadeIn(300);
              if (modal) {
                  $("#overlayctoa").unbind("click");
              } else {
                  $("#overlayctoa").click(function(e) {
                      HideDialogcToa();
                  });
              }
          });
          kdp.kUnbind("playerPlayed");
        kdp.kBind('playerPlayed', function() {
              var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
              if (!(playerStartedArray.indexOf(mTitle) > -1)) {
          video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
          video.played = false;
          try {
                      console.log("Player Started @ Movie Dynamic inline ");
              trackVideoEvent(sc_user, sc_contentpath, sc_contentName, sc_event, video);
            }catch(err) {
              console.log(err.message); 
            }
                  video.played = true;
          playerStartedArray.push(mTitle);
              } 
          });
        kdp.kUnbind("doReplay");
          kdp.kBind('doReplay', function() {
        var mTitle = "learn how to use their inhaler by preparing, priming, using and cleaning";
          try {
              video.title = "learn how to use their inhaler by preparing, priming, using and cleaning";
            playerReplay(mTitle);
            updateProgressArray(is25PercentPlayedArray,mTitle);
            updateProgressArray(is50PercentPlayedArray,mTitle);
            updateProgressArray(is70PercentPlayedArray,mTitle);
            updateProgressArray(is75PercentPlayedArray,mTitle);
            }catch(err) {
              console.log(err.message); 
            }
          });
      }
  
  });
  
  }
  /* End */
  
  }      
  </script>
      
      
  
  
  
  
  
  </div>`;
  block.innerHTML = section;
}