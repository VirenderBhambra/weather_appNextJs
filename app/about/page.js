import styles from './page.module.css'
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import Link from 'next/link';
export default function About(){
    
    return(
        <div className={styles.about}>
            <Link href='/'><Button variant="outlined" >Go Back</Button></Link>
            <div className={styles.info}>
                <h1>Virender Bhambra</h1>
                <h2>
                    Links: 
                    <a href='https://github.com/VirenderBhambra'><GitHubIcon/></a>
                    <a href='https://twitter.com/BhambraVirender'><XIcon/></a>
                </h2> 
                
                <div>
                    <h2>Tech Stack used : NextJs, ReactQuery, Material UI, Jotai</h2>
                    <h2>Weather Api : <a href='https://www.weatherapi.com/'>weatherapi.com</a></h2>
                    <h2>Design Idea : <a href='https://uizard.io/'>uizard.io</a></h2>
                </div>

            </div>
        </div>
    )
}