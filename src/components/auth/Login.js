import React from "react"
import Settings from "../Settings"
import "./Auth.css"

export const Login = () => <article className="container--login">
    <h1>NSS Learning Platform</h1>

    <div style={{
        "margin": "2rem 0",
        "padding": "0 10rem"
    }}>
        Please make sure you have created an account on Github, and entered your name in your <a href="https://github.com/settings/profile">account profile</a> before accessing the Learning Platform.
    </div>

    <a href={`${Settings.apiHost}/auth/github/url`} className="button bg-2 button--size-l button--round-m button--border-medium btn-github ">
        <i className="fa fa-github"></i> Sign in with Github
    </a>
</article>
