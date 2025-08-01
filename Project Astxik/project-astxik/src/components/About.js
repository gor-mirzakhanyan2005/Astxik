import React from 'react'
import styles from "../stylesheets/About.module.css"

const About = () => {
  return (
    <div className={styles.aboutDiv}>
            <h1>About us</h1>
            <section className={styles.aboutSection}>
                <p>We’re more than just an online thrift store — we’re a mission in motion.
                    [Your Store Name] was created to help fund the ministries and community outreach programs of [Church Name],
                    a local church dedicated to spreading hope, compassion, and faith in action.</p>
                    <br></br>
                <p>
                    Every item in our store has been generously donated,
                    and every sale directly supports the church’s efforts — from feeding families in need,
                    to supporting youth programs, to maintaining a space where people can gather, worship,
                    and grow.
                </p>
                <br></br>
                <p>
                    We believe that secondhand shopping can do more than reduce waste — it can build stronger communities.
                    When you shop with us, you’re not just finding affordable,
                    sustainable fashion and household treasures — you’re becoming part of something bigger.
                </p>
                <br></br>
                <p>
                    Thank you for supporting our mission.
                    Your simple act of thrifting helps us share love, serve others,
                    and keep our church thriving.
                </p>
            </section>
    </div>
  )
}

export default About