import Head from 'next/head'
import styles from '../styles/Check.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Home() {
   const router = useRouter();
   useEffect(() => {
   
    let token = localStorage.getItem("token");
    if (!token) return router.push("/");
    fetch("https://discord.com/api/v8/users/@me", {
      headers: {
        "Authorization": `Bot ${token}`
      }
    })
    .then(res => res.json())
    .then(async user => { 
      if (user.message === "401: Unauthorized") { 
        document.getElementById("main").style.display = "none"
        document.getElementById("loading").style.display = "none"
        return document.getElementById("invalid").style.display = "block"; 
      }
      if (user.bot == false) {
        document.getElementById("main").style.display = "none"
        document.getElementById("invalid").innerText = "Uh oh! Looks like you provided an user token, please provide a bot token.";
        return document.getElementById("invalid").style.display = "block"
      }
      let loadingTxt = document.getElementById("loading");
      setTimeout(() => {
        loadingTxt.innerText = "Loading."
        setTimeout(() => {
          loadingTxt.innerText = "Loading.."
          setTimeout(() => {
            loadingTxt.innerText = "Loading..."
            setTimeout(() => {
              loadingTxt.innerText = "Loading."
              setTimeout(() => {
                loadingTxt.innerText = "Loading.."
                setTimeout(() => {
                  loadingTxt.innerText = "Loading..."
                  setTimeout(() => {
                    loadingTxt.style.display = "none";
                    document.getElementById("main").style.filter = "none"
                  }, 2000)
                }, 1000)          
              }, 1000)        
            }, 1000)      
          }, 1000)    
        }, 1000)  
      }, 1000)

      fetch(`https://cors-anywhere.androz2091.fr/https://colorthief.shadeoxidee.repl.co/?image=https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`, {
        method: "GET",
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(res => res.json())
      .then(data => document.getElementById("banner").style.background = data.data);
      document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`;
      document.getElementById("username").innerText = user.username
      document.getElementById("discriminator").innerText = "#" + user.discriminator
      if (user.flags == 65536) {
        document.getElementById("botBadge").style.width = "35px"
        document.getElementById("verified").style.display = "block"
        document.getElementById("botText").style.marginTop = "-15px"
        document.getElementById("botText").style.marginLeft = "9px"
      }

      fetch("https://discord.com/api/v8/users/@me/guilds", {
        headers: {
        "Authorization": `Bot ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("guilds").innerHTML = "<b>Guilds:</b> " + data.length;        
      })
      fetch("https://cors-anywhere.androz2091.fr/https://discord.com/api/v8/oauth2/applications/@me", {
        headers: {
          "Authorization": `Bot ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(res => res.json())
      .then(data => {
        let owner = data.owner.username + "#" + data.owner.discriminator;
        let description = data.description || "No description"
        document.getElementById("description").innerHTML = "<b>Description:</b> " + description;
        document.getElementById("owner").innerHTML = "<b>Owner:</b> " + owner;
        document.getElementById("public").innerHTML = "<b>Public Bot:</b> " + (data.bot_public == false ? "No" : "Yes");

        if (data.bot_public == true) {
          document.getElementById("invite").href = `https://discord.com/oauth2/authorize?client_id=${user.id}&scope=bot&permissions=0`
        } else {
          document.getElementById("invite").style.opacity = "0.75"
          document.getElementById("invite").style.cursor = "not-allowed"
        }
      })

    });
    localStorage.removeItem("token");
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Discord Token Validator</title>
        <meta name="description" content="Check if a Discord Token is valid." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <h1 id="loading" style={{"textAlign": "center", "zIndex": "69", "top": "45%", "left": "50%", "marginRight": "-50%", "position": "absolute", "transform": "translate(-50%, -50%)"}}>Loading</h1>
     <h1 id="invalid" style={{"display": "none", "textAlign": "center", "zIndex": "69", "top": "45%", "left": "50%", "marginRight": "-50%", "position": "absolute", "transform": "translate(-50%, -50%)"}}>The token provided is invalid.</h1>
      <main id="main" className={styles.main}>
            <div className={styles.profileCard}>
            <div id="banner" style={{"height": "105px", "background": "transparent"}}></div>
            <img id="avatar" width="120px" draggable="false" style={{"borderRadius": "50%", "border": "8px solid #18191C", "zIndex": "5", "marginTop": "-57px", "marginLeft": "16px"}}></img>
            <a id="invite" className={styles.button} target="_blank">Invite Bot</a>
            <br></br>
            <div style={{"display": "inline-block"}}>
            <h1 id="username" style={{"height": "15px", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`, "display": "inline-block", "fontSize": "18px", "fontWeight": "600", "marginLeft": "16px", "marginTop": "15px"}}></h1>
            <h1 id="discriminator" style={{"display": "inline-block", "color": "#b9bbbe", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`, "fontSize": "18px", "fontWeight": "600", "marginLeft": "3px"}}></h1>
            </div>
            <div id="botBadge" style={{"position": "relative", "marginLeft": "5px", "height": "15px", "padding": "1px 4px", "fontSize": "0.625rem", "background": "hsl(235, 85.6%,64.7%)", "borderRadius": "3px", "width": "27px", "display": "inline-block", "overflow": "hidden"}}><svg id="verified" aria-label="Verified Bot" aria-hidden="false" width="15" height="15" style={{"display": "none", "marginTop": "-1px", "marginLeft": "-5px"}} viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="#FFF"></path></svg><div id="botText">BOT</div></div>
            <div style={{"marginTop": "20px", "height": "1px", "width": "100%", "background": "rgba(255, 255, 255, 0.1)"}}></div>
            <h1 style={{"marginTop": "15px", "color": "#b9bbbe", "fontSize": "11px", "fontWeight": "700", "marginLeft": "16px", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`}}>ABOUT ME</h1>
            <h1 id="description" style={{"color": "#dcddde", "marginTop": "10px", "fontSize": "11px", "fontWeight": "400", "marginLeft": "16px", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`, "marginBottom": "0"}}></h1>
            <h1 id="guilds" style={{"color": "#dcddde", "marginTop": "2px", "fontSize": "11px", "fontWeight": "400", "marginLeft": "16px", "marginBottom": "0", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`}}></h1>
            <h1 id="owner" style={{"color": "#dcddde", "marginTop": "2px", "fontSize": "11px", "fontWeight": "400", "marginLeft": "16px", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`, "marginBottom": "0"}}></h1>
            <h1 id="public" style={{"color": "#dcddde", "marginTop": "2px", "fontSize": "11px", "fontWeight": "400", "marginLeft": "16px", "fontFamily": `Ginto,"Helvetica Neue",Helvetica,Arial,sans-serif`, "marginBottom": "0"}}></h1>                        
            </div>
        </main>
    </div>
  )
}
