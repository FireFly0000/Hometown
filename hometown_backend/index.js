const schedule = require('node-schedule')
var express = require('express');
var app = express();
const port = 3000;



// supabase connection
const {createClient} = require('@supabase/supabase-js')
const supabaseUrl = 'https://zldofslsogdfhztknztq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZG9mc2xzb2dkZmh6dGtuenRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMzI4NTIsImV4cCI6MTk4NTYwODg1Mn0.pz95-aV40QLGjPawBoGRs3oqrLuJ8woN5jELs-GaFxU'

const supabase = createClient(supabaseUrl, supabaseKey)

const superagent = require('superagent');

// mail stuff
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  pool: true,
  maxMessages: Infinity,
  auth: {
    user: 'no.reply.ucr.hometown@gmail.com', 
    pass: 'vvkfyxwtavnqgzva', 
  }
});

// sms stuff
const accountSid = "AC0c623d18728bb70fdf9468a11bac682e";
const authToken = "98122f9ea6fcda071f0944106a0c3933"
const client = require("twilio")(accountSid, authToken);

// const Nexmo = require('nexmo')
// const nexmo = new Nexmo({
//   apiKey: "840b2d77",
//   apiSecret: "k6w1o4uf5bSkqO04"
// })

var mostRecentRun = new Date();

schedule.scheduleJob('* * * * *', () =>{
    mostRecentRun = new Date();
    const getBusinesses = async () => {
      const ymd = `${mostRecentRun.getFullYear()}-${('0' + (mostRecentRun.getMonth() + 1)).slice(-2)}-${('0' + (mostRecentRun.getDate())).slice(-2)}`
      let { data: scheduled_campaign, error } = await supabase
      .from('scheduled_campaigns')
      .select('*')
      .eq('scheduled_date', ymd)
    
      return scheduled_campaign         
    }
    getBusinesses().then((scheduled_campaign) => {
      
      for (item in scheduled_campaign){
        const scheduled_id = scheduled_campaign[item]['id']
        const business_id = scheduled_campaign[item]['business_id']
        const subject = scheduled_campaign[item]["subject"];
        const message = scheduled_campaign[item]["message"];
        let all_bid = scheduled_campaign[item]['collaborators']
        if(all_bid == null){
          all_bid = [];
          all_bid.push(business_id)
        }
        else
          all_bid.push(business_id)

        const getBusinessCustomers = async (input_id) => {
          let { data: owners_customers, error } = await supabase
            .from('owners_customers')
            .select('*')
            .eq('business_id', input_id)
            return owners_customers
        }
        for(i in all_bid){
          getBusinessCustomers(all_bid[i]).then((owners_customers) => {
            console.log(owners_customers)
            for (item in owners_customers){
              const customer_id = owners_customers[item]['customer_id']
              const getCustomerPreferences = async () => {
                console.log("Called")
                let { data: customer_info, error } = await supabase
                  .from('all_customers')
                  .select('*')
                  .eq('id', customer_id)
                  return customer_info
              }

              getCustomerPreferences().then((customer_info) => {
                console.log(customer_info)
                if (customer_info[0]['prefer_phone']){
                  const customer_phone = customer_info[0]['phone_number'];
                    client.messages
                    .create({ body: subject + '\n\n' + message, from: "+14199103578", to: customer_phone })
                    .then(message => console.log(message.sid));
                }
                else{
                  console.log("Attempted Email")
                  const customer_email = customer_info[0]['email_address'];
                  const send_email_customers = async () => { 
                    let info = await transporter.sendMail({
                      from: 'no.reply.ucr.hometown@gmail.com', 
                      to: customer_email, 
                      subject: subject, 
                      text: message, 
                    });
                  }
                  send_email_customers();

                }
              })
            }
          })
        }
        const delete_campaign = async () => {
          let { data: customer_info, error } = await supabase
            .from('scheduled_campaigns')
            .delete()
            .eq('id', scheduled_id)
        }
        delete_campaign()
      }
      }
    )
  });

const send_notifications = () =>{ 
  mostRecentRun = new Date();
  var called = 0;
    const getBusinesses = async () => {
      const ymd = `${mostRecentRun.getFullYear()}-${('0' + (mostRecentRun.getMonth() + 1)).slice(-2)}-${('0' + (mostRecentRun.getDate())).slice(-2)}`
      let { data: scheduled_campaign, error } = await supabase
      .from('test_scheduled_campaigns')
      .select('*')
      .eq('scheduled_date', ymd)
      console.log(ymd)
      return scheduled_campaign         
    }
    getBusinesses().then((scheduled_campaign) => {
      console.log("bruh")
      console.log(scheduled_campaign)
      for (item in scheduled_campaign){
        const scheduled_id = scheduled_campaign[item]['id']
        const business_id = scheduled_campaign[item]['business_id']
        const subject = scheduled_campaign[item]["subject"];
        const message = scheduled_campaign[item]["message"];
        let all_bid = scheduled_campaign[item]['collaborators']
        if(all_bid == null){
          all_bid = [];
          all_bid.push(business_id)
        }
        else
          all_bid.push(business_id)

        const getBusinessCustomers = async (input_id) => {
          let { data: owners_customers, error } = await supabase
            .from('test_owners_customers')
            .select('*')
            .eq('business_id', input_id)
            return owners_customers
        }
        for(i in all_bid){
          getBusinessCustomers(all_bid[i]).then((owners_customers) => {
            console.log(owners_customers)
            for (item in owners_customers){
              const customer_id = owners_customers[item]['customer_id']
              const getCustomerPreferences = async () => {
                console.log("Called")
                let { data: customer_info, error } = await supabase
                  .from('test_all_customers')
                  .select('*')
                  .eq('id', customer_id)
                  return customer_info
              }

              getCustomerPreferences().then((customer_info) => {
                console.log(customer_info)
                if (customer_info[0]['prefer_phone']){
                  const customer_phone = customer_info[0]['phone_number'];

                }
                else{
                  console.log("Attempted Email")
                  const customer_email = customer_info[0]['email_address'];
                  const send_email_customers = async () => { 
                    let info = await transporter.sendMail({
                      from: 'no.reply.ucr.hometown@gmail.com', 
                      to: customer_email, 
                      subject: subject, 
                      text: message, 
                    });
                  }
                  send_email_customers();
                  called += 1;
                  console.log(called)

                }
              })
            }
          })
        }
        const delete_campaign = async () => {
          let { data: customer_info, error } = await supabase
            .from('test_scheduled_campaigns')
            .delete()
            .eq('id', scheduled_id)
        }
        delete_campaign()
        
      }
      }
    )
}

app.get('/', (req, res) => {
    res.send("Current time is: " + mostRecentRun.toString());
  });


app.get('/test_api', (req, res) => {
  var thing = new Date()
  const ymd = `${thing.getFullYear()}-${('0' + (thing.getMonth() + 1)).slice(-2)}-${('0' + (thing.getDate())).slice(-2)}`

  for (var i = 0; i < 10; i++){
    const create_business = async () => {
      const { data: insert_business_data, error } = await supabase
      .from('test_business_owners')
      .insert([
        { "username": `test_business${i}`, "password": 'password', "business_type": 'test', "business_name": `test_business${i}`, "zip_code": 0, "campaign_invitations": []},
      ])
      .select('id')
      return(insert_business_data)
    }
    create_business().then((insert_business_data) => {
      const current_business = insert_business_data[0]['id']
      for (var j = 0; j < 10; j++){
        const create_customers = async () => {
          const { data: insert_customer_data, error } = await supabase
            .from('test_all_customers')
            .insert([
              { "email_address": `temp${j}@foo.bar`, "phone_number": '', "prefer_phone": false}
            ])
            .select('id')
            return(insert_customer_data)
        }
        create_customers().then((insert_customer_data) =>{
          const current_customer = insert_customer_data[0]['id']
          const insert_owner_cust = async () => {
          const { error } = await supabase
            .from('test_owners_customers')
            .insert([
              { "business_id": current_business, "customer_id": current_customer}
            ])
            if (error)
              console.log(error)
          }
          insert_owner_cust()
        })
      }
      const create_campaign = async () => {
        const { error } = await supabase
          .from('test_scheduled_campaigns')
          .insert([
            { "business_id": current_business, "scheduled_date": ymd, "message": 'test', "subject": 'test'}
          ])
      }
      create_campaign()
    })
}
  res.send("API called");
});

app.get('/test_send_notifications', (req, res) => {
    send_notifications()
    res.send("Sending notifications")
});

app.get('/test_clean_table', (req, res) => {
  const clean_owner_cust = async () => {
    const { error } = await supabase
      .from('test_owners_customers')
      .delete()
      .neq('id', 0)
      console.log(error)
  }
  const clean_business = async () => {
    const { error } = await supabase
      .from('test_business_owners')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      console.log(error)

  }
  const clean_customers = async () => {
    const { error } = await supabase
      .from('test_all_customers')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      console.log(error)

  }
  const clean_scheduled = async () => {
    const { error } = await supabase
      .from('test_scheduled_campaigns')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      console.log(error)

  }
  clean_owner_cust()
  clean_business()
  clean_customers()
  clean_scheduled()
  res.send("Cleaned Table")
});

schedule.scheduleJob(('0 0 1 1 *'), ()=>{
superagent
  .get('https://api.census.gov/data/2021/acs/acs5/profile?get=NAME,group(DP05)&for=zip%20code%20tabulation%20area:92507')
  .set('accept', 'json')
  .end((err, res) => {
    let white = res['body'][1][289]
    let black = res['body'][1][297]
    let na = res['body'][1][305]
    let asian = res['body'][1][345]
    let latino = res['body'][1][561]

    const create_business = async() => {
      const {error} = await supabase
      .from('demographics')
      .insert([{
        "zip_code":92507,
        "white": white,
        "black": black,
        "native_american": na,
        "asian": asian,
        "latino": latino
      }])
    }
    create_business()
  })
})

schedule.scheduleJob('0 0 * * *', () =>{
superagent
  .get('https://api.weather.gov/points/33.9735,-117.3264')
  .set('accept', 'json')
  .set({'User-Agent': 'hometown_ucr/v1.0 (http://hometown.ucr.com; no.reply.ucr.hometown@gmail.com)'})
  .end((err, res) => {
    if (!err && res.statusCode == 200) {
      superagent
        .get(res['body']['properties']['forecast'])
        .set('accept', 'json')
        .set({'User-Agent': 'hometown_ucr/v1.0 (http://hometown.ucr.com; no.reply.ucr.hometown@gmail.com)'})
        .end((error, result) => {
            let day1 = result['body']['properties']['periods'][0]
            let day2 = result['body']['properties']['periods'][2]
            let day3 = result['body']['properties']['periods'][4]
            let day4 = result['body']['properties']['periods'][6]
            let day5 = result['body']['properties']['periods'][8]
            let day6 = result['body']['properties']['periods'][10]
            let day7 = result['body']['properties']['periods'][12]
            const create_business = async () => {
              const { error } = await supabase
              .from('weather')
              .insert([
                { "latitude": 33.9735, 
                "longitude": -117.3264,
                "day1": day1, 
                "day2": day2, 
                "day3": day3, 
                "day4": day4, 
                "day5": day5, 
                "day6": day6,
                "day7": day7,
              }
              ])
            }
            create_business()
        })
    }
  });
})

app.listen(port, () => console.log('Test listening on port ${' + port + '}!'));