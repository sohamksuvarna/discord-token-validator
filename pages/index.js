import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Discord Token Validator</title>
        <meta name="description" content="Check if a Discord Token is valid." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main id="main" className={styles.main}>
       <h1 className={styles.title}>Discord Token Validator</h1>
       <input className={styles.token} id="token" placeholder="Token" type="password" style={{"height": "50px", "width": "150%", "textAlign": "center", "fontSize": "20px"}}></input>
       <div className={styles.hover} onMouseEnter={() => {
         document.getElementById("token").type = "text"
       }} onMouseLeave={() => {
         document.getElementById("token").type = "password"
       }} style={{"marginTop": "4px", "cursor": "pointer"}}>Hover to Show Token</div>
       <div className={styles.checkButton} onClick={() => {
         let value = document.getElementById("token").value;
         if (!value) alert("Please provide a token!");
         localStorage.setItem("token", value);
         router.push("check");
       }} style={{"background": "#7289DA", "padding": "10px 50px", "borderRadius": "5px", "marginTop": "20px", "cursor": "pointer"}}>Check</div>
      </main>
      <footer className={styles.footer} style={{"marginBottom": "15px"}}>Made with <svg style={{"marginBottom": "-1px"}} width="12px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg> by <a style={{"fontWeight": "800"}} href="https://github.com/shadeoxide">shadeoxide</a></footer>
     </div>
  )
}
