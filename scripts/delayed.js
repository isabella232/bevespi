// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';
// eslint-disable-next-line import/no-cycle
import { loadScript, getEnvType } from './scripts.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

/**
 * Tealium Tags
* */
async function loadTagData() {
  const scriptTag1 = document.createElement('script');
  scriptTag1.innerHTML = `
      document.addEventListener("DOMContentLoaded", function(){
        var dateStringLocal ="";
        var dateStringinAMPM ="";
        try{
        
        var addr = document.URL;
        if((addr.indexOf("http") > -1) || (addr.indexOf("https") > -1)) {
            start_idx = addr.indexOf('/', 8);
        } else {
            start_idx = addr.indexOf('/');
        }
        if (start_idx > -1) {
            end_idx = addr.indexOf("?", start_idx);
            if (end_idx == -1) {
                end_idx = addr.length;
            }
                addr = addr.substring(start_idx+1, end_idx);
        }
        
        var todayLocal = new Date();  
        var sc_hours = todayLocal.getHours();
        var sc_minutes = todayLocal.getMinutes();
        
        var sc_hours_12format=sc_hours;
        
        var timeType = "AM";
        
        if(sc_hours > 12){
          timeType = "PM";
          sc_hours_12format = sc_hours - 12;
        }  
        
        if(sc_minutes < 10){
          sc_minutes = "0" +sc_minutes;
        }
        
        dateStringLocal = sc_hours + ":" + sc_minutes;      
        dateStringinAMPM = sc_hours_12format + ":" + sc_minutes + " "+ timeType ;
        
        }catch(err){ 
        
        }
            /** Tealium tags data **/
            /** Open-23381 Removing Redundant UDO (utag_data) variables from data layer */
            window.utag_data = window.utag_data || {};
            utag_data.page_name = "home";
            utag_data.page_section = "home";
            utag_data.page_subsection = "home";
            utag_data.page_channel = ".";
            utag_data.page_server = "www.bevespi.com";
            utag_data.visitor_login_status = "anonymous";
            utag_data.visitor_time = dateStringinAMPM;
          utag_data.page_url = addr;
          utag_data.visitor_nexus_id = "anonymous";
          utag_data.visitor_email_address = "anonymous";
            utag_data.search_string = $('input[name="q"]').val();
            utag_data.visitor_user_type = "anonymous";
            utag_data.page_target_platform = "";
          utag_data.page_market=""; 
          utag_data.page_language=$('html').attr('lang');
          utag_data.page_brand="";
            utag_data.server_time = dateStringLocal;
          utag_data.visitor_azid = "";
          utag_data.page_therapy_area = "";
            utag_data.product_indication = ""; 
          utag_data.product_name = "";
          utag_data.page_customer_type = "";
          utag_data.visitor_type_user_node = "";
          utag_data.product_speciality_type = ""; 
          utag_data.page_referrer = "null";
            utag_data.visitor_id = "anonymous";
          utag_data.visitor_auth_status = "";
          utag_data.visitor_wechat_id= "";
      });
    `;
  const scriptTag2 = document.createElement('script');
  scriptTag2.innerHTML = `
      (function(a,b,c,d){
        a='//tags.tiqcdn.com/utag/astrazeneca/us-bevespi/prod/utag.js';
        b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
        a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
      })();
    `;
  document.head.prepend(scriptTag1, scriptTag2);
}

async function loadTagScript() {
  loadScript('https://tags.tiqcdn.com/utag/astrazeneca/us-bevespi/prod/utag.sync.js', () => {
    // eslint-disable-next-line
    loadTagData();
  });
}

if (getEnvType() === 'live') {
  await loadTagScript();
}
