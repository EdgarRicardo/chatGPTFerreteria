'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import './chatgpt.css'

export default function HelpChatGPT() {
    const [question, setQuestion] = useState("");
    const [conversation, setConversation] = useState("");
    const [loading, setLoading] = useState(false);

    async function callApi() {
        let convers = conversation+"Cliente: "+question+"\nIA:";
        setConversation(convers)
        setQuestion("")

        setLoading(true);
        const reqChatGTP = await fetch("https://api.openai.com/v1/completions", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify(
                {
                    "model": "text-davinci-003",
                    "prompt": `Eres un ferretero y cuentas con un negeocio conmultiples herramientas de marcas como Truper, Urrea, Comex, Dewalt, Black&Decker, Bosch, Dremel, Resiltol, Makita, Cemex, Bellota, Stanley, entre muchas otras marcas de esta indeole. Debes ayudar al Cliente a consiga el material o materiales, la herramienta o herramientas que requiere según las necesidades que te mencione. Para que el cliente pueda ver de forma visual las recomendaciones, debes de regresar una tabla de html con las siguientes columnas, Nombre de la herramienta/material,precio según mi ubicación en moneda mexicana (MXN), descripción y detalles, y en cada fila dar la lista de materiales recomentados sin importar si es 1 o n materiales. Igual puedes contestar de manera natural sin html a una pregunta que no necesite de una tabla en html.
                    
                    Cliente: Hola
                    IA: ¿Qué necesitas?
                    Cliente: Necesito algo para colgar un foto en mi pared de concreto
                    IA: Necesitaras lo siguiente <br><table style="width: 100%"><tr><td>Nombre de la herramienta/material</td><td>Precio MXN</td><td>Descripción y detalles</td></tr><tr><td>Martillo</td><td>210</td><td>16 oz marca Truper, mango fibra de vidrio. Este te servira para clavar el clavo en la pared</td></tr><tr><td>Clavo para concreto</td><td>650</td><td>2 1/2" marca Truper paquete con 1570 piezas. Con unas cuantas piezas de clavos lograras sostener tu cuadro</td></tr></table>
                    ${convers}`,
                    "temperature": 0,
                    "max_tokens": 400,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "stop": ["\n"]
                }
            )
        });
        const resChat = await reqChatGTP.json();
        setConversation(prevConv => prevConv+" "+resChat.choices[0].text+"\n")
        setLoading(false);
    }

    return (
        <div className='chat'>
            <div className='conversation'>
                <span dangerouslySetInnerHTML={{ __html: conversation.replaceAll("\n","<br>") }}></span>
                {loading && <PulseLoader color="#fff" />}
            </div>
            <div className='input-question'>
                <textarea value={question} onChange={e=> setQuestion(e.target.value)} />
                <button onClick={callApi}>Ayudame</button>
            </div>
        </div>

    );
}
