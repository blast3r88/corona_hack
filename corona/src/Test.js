import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SimpleCard from './SimpleCard';
import { Grid } from '@material-ui/core';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

var colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new window.SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;



var synth = window.speechSynthesis;

var colorHTML = '';
colors.forEach(function (v, i, a) {
    //  console.log(v, i);
    colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
// hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 14,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
}));




function Test(props) {



    const [helpList, setHelpList] = useState([
    ]);

    const [start, setStart] = useState(false);

    const [stage, setStage] = useState(-1);

    const [listening, setListening] = useState(false);
    const [reading, setReading] = useState(-1);
    const [answers, setAnswers] = useState([]);


    const [action, setAction] = useState("nothing");

    var questions = ["Hello whats your name?",
        "Dear" + answers[0] + "Is your adress Zurich, Langstrasse 5?", "What would you like to order?", "How much?",
        "Is that all?", "Your order has been placed.",""
       ];
// "Peter has picked up your order.", "Dora has payed for your bill.", "Your order has been arrived. Have a nice day."
    function toggleListen() {
        setListening(!listening);
    }

    function toggleRead() {
        setReading(!reading);
        speak("can you read this?");

    }

    useEffect(() => {
        if (start) {
            setStage(0);
        }
    }, [start]);

    useEffect(() => {
        if (answers.length > 0) {
            // setStage(stage+1);
        }
    }, [answers]);

    useEffect(() => {

        if (-1 < stage && stage < questions.length) {
           
        
            if ( stage == 6) {
                props.addToShopping(answers);
             var newHelpList = helpList.slice();
            newHelpList.push({ name: answers[0], location: "Zurich, Langstrasse 5", order: answers[2], quant: answers[3] });
            setHelpList(newHelpList);
            
            }

            speak(questions[stage]);
        } else if (stage == questions.length) {

            setStage(-1);
            setAnswers([]);
        }

    }, [stage]);

    useEffect(() => {
        // handleListen();
    }, [listening]);

    function onClick() {
        toggleListen();
    }



    function speak(sentence) {

        setAction("speak");
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }
        if (sentence !== '') {

            var utterThis = new SpeechSynthesisUtterance(sentence);
            utterThis.onend = function (event) {
                //   console.log('SpeechSynthesisUtterance.onend');
                setAction("nothing");
                handleListen();
            }
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror');
            }
            utterThis.voice = synth.getVoices()[5];
            utterThis.pitch = 1;
            utterThis.rate = 1;

            synth.speak(utterThis);
        }

    }


    function handleListen() {
        setAction("listen");

        recognition.start();
        recognition.onend = () => {
            setStage(stage + 1);
            setAction("nothing");
            console.log("here");
        }


        let finalTranscript = ''

        recognition.onresult = event => {

            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                const confidence = event.results[i][0].confidence;
                if (event.results[i].isFinal) finalTranscript += transcript + "(" + confidence + ")" + ' ';
                else interimTranscript += transcript;
            }
            document.getElementById('interim').innerHTML = interimTranscript
            document.getElementById('final').innerHTML = finalTranscript


            if (event.results[0][0] != undefined) {
                var newAnswers = answers.slice();
                newAnswers[stage] = event.results[0][0].transcript;
                setAnswers(newAnswers);
                recognition.stop();
                //setStage(stage + 1);

            } else {
                console.log("empty");
            }
        }

        recognition.onnomatch = event => {
            console.log("empty");
        }

        recognition.onerror = event => {
            console.log("empty");
            recognition.stop();
           // speak("Sorry didnt hear that.");
            //   setStage(stage);
        }

    }

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <div>
                <Button variant="contained" color="primary" onClick={() => setStart(true)}>
                    Start
                </Button>
                {listening}
                <div id='interim' ></div>
                <div id='final'></div>
            </div>

            {action}

            <div>
                {answers.toString()}
            </div>

            <Grid container className={classes.root} spacing={2}>
                {
                    helpList.map(function (item, i) {
                        return <Grid item xs={12}>
                            <SimpleCard data={item} />
                        </Grid>
                    })
                }


            </Grid>



        </div>
    );
}

export default Test;
