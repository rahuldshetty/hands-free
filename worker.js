import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

const AI_SYS_PROMPT = 'You are a helpful assistant with the name "Zed".';

let transcriber = await pipeline(
    'automatic-speech-recognition',
    'Xenova/whisper-tiny.en',
);

const generator = await pipeline(
    'text-generation',
    'Xenova/Qwen1.5-0.5B-Chat'
);

console.log("Web Worker loaded successfully!");

const EVENT_TRANSCRIBE = "stt";
const EVENT_TEXT_GEN = "txt_gen";

const askAI = async (userMessage) => {
    let messages = [
        { role: 'system', content: AI_SYS_PROMPT },
        { role: 'user', content: userMessage }
    ];

    // Apply chat template
    const text = generator.tokenizer.apply_chat_template(messages, {
        tokenize: false,
        add_generation_prompt: true,
    });

    // Generate text
    const output = await generator(text, {
        max_new_tokens: 64,
        do_sample: false,
        return_full_text: false,
    });

    return output[0].generated_text;
}

const transcribe = async (audio) => {
    let output =  await transcriber(audio);
    if(output && !output['text'].includes('BLANK_AUDIO')){
        return output['text'];
    } else {
        return "";
    }
}

onmessage = async (event) => {
    console.log("Message received from main script");
    if(event.data.type == EVENT_TRANSCRIBE){
        postMessage({
            "type": EVENT_TRANSCRIBE,
            "text": await transcribe(event.data.input)
        })
    } else if(event.data.type == EVENT_TEXT_GEN){
        postMessage({
            "type": EVENT_TEXT_GEN,
            "text": await askAI(event.data.input)
        })
    }
};
