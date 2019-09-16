import React from 'react';
import {Helmet} from "react-helmet";

export default function PrivacyPolicy(props) {
    return (
        <div style={{ margin: 100, marginLeft: 200, marginRight: 200, color: '#ffffff' }}>
               <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Privacy Policy</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <h1>Signalant - Privacy Policy</h1>
            <p>We will not sell or market the email addresses or other collected personal information of registered users to third parties.</p>
            <p>Cookies and Passive Data Collection </p>
            <p>Signalant uses cookies, IP addresses, location and URL information to improve and further develop the service, and to provide enhancements for features. Signalant uses cookies to save usernames, sessions, settings, and may use them to provide tailored experience on the Signalant.com website.</p> 
            <p>{`IP Addresses also help us diagnose service problems such as network connection and server issues, and to deliver a tailored experience based on the IP's geographical location.`}</p> 
            <p>Users should be aware that when they visit Signalant.com via links from other websites, the referring URL information may be logged Signalant.</p>
            <p>User Information Signalant Collects </p>
            <p>When registering with Signalant, users provide Personal Data such as their name, email, country, city, state, etc. Furthermore, when using the service, users can register mobile phone numbers to receive alerts. All information collected by Signalant is used for purposes of providing the service and support to its users, and to improve the level of service in the future. Signalant aggregates non-identifying information provided by users to understand its user base and to improve services. </p>
            <p>To protect your account information, please keep your password secure.</p>
            <p>All users may opt to remove their personal data from Signalant records by contacting Signalant and requesting to opt out, which will result in cancellation of their account. </p>
            <p>Outgoing Links to Third Party Sites </p>
            <p>Signalant.com may contain links to other sites that are not under our control. These websites have their privacy policies. Before visiting the websites in question, you should review those policies. Signalant has no responsibility for linked websites. </p>
            <p>This privacy policy may be change without notice.</p>
        </div>
    );
}