import React from 'react';
import {Helmet} from "react-helmet";

export default function TermsAndConditions(props) {
    return (
        <div style={{ margin: 100, marginLeft: 200, marginRight: 200, color: '#ffffff' }}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Terms & Conditions</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <h1>Signalant - Terms & Conditions</h1>
            <p>Signalant provides the service service to you, subject to acceptance all of the terms and conditions, policies and procedures that may be published from time to time on this site by Signalant. We reserve the right to modify these terms. You are responsible for reviewing and becoming familiar with any such modifications. Such modifications are effective immediately upon first posting, and use of our website or any services by you, constitutes your acceptance of these Terms as modified. IF YOU DO NOT AGREE TO THESE TERMS, THEN DO NOT ACCESS OR USE SIGNALANT. BY VIEWING OR USING ALL OR ANY PART OF THE SERVICE, COMPLETING THE SUBSCRIPTION, OR INPUTTING YOUR EMAIL, YOU AGREE TO BE BOUND BY ALL OF THE TERMS. </p>
            <p>Signalant.com will not be held responsible for the reliability, timeliness, or accuracy of this service. The service is provided in good faith; however, there are no explicit or implicit warranties of accuracy or timeliness made by Signalant.com. The user agrees not to hold Signalant.com liable for decisions that are based on alerts or information from this website. Before making a decision on trading the user should verify facts from independent sources. Prices are only to be used as reference and always confirm with your broker for accurate tradable fx pricing. </p>
            <p>When receiving email or text messages on your phone, please note that standard or additional text-messaging/SMS/email-to-sms/mms rates apply. Signalant sends messages to the address you specify and will not be held responsible for any charges you incur from your mobile provider as a result of receiving these messages on your mobile phone. </p>
            <p>Check with your carrier and mobile plan to get details on your incoming sms/text/mms/email-to-sms rates.</p>
            <p>Signalant reserves the right to close/disable any alert or account for any reason including, but not limited to abuse or copyright infringement. </p>
        </div>
    )
};

