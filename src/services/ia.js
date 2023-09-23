
const COHERE_API_KEY='Gzu0DwBJJdjnfGud4UOtotLCTznBO3X89SrB781o';
const COHERE_API_GENERATE_URL='https://api.cohere.ai/v1/generate';


export async function fixMyEnglish(input){
    const data= {
        model:'xlarge',
        prompt:`This is a spell checker generator.
        
        --
        Incorrect sample: "I are good!"
        Correct sample: "I am good"
        --
        Incorrect sample: "I have 22 years old."
        Correct sample: "I am 22 years old."
        --
        Incorrect sample:"I don't can know"
        Correct sample: "I don't know"
        --
        Incorrect sample:"${input}"
        Correct sample:`,
        max_tokens:20,
        temperature:0.3,
        truncate: 'END',
        k:0,
        p:1,
        frequency_penalty:0,
        presence_penalty:0,
        stop_sequences:['--'],
        return_likelihooods:'NONE'
      }

    const response = await fetch(COHERE_API_GENERATE_URL,{
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${COHERE_API_KEY}`
          },
          body:JSON.stringify(data)
     
    }).then(res=>res.json())

    const {text} = response.generations[0]
    
    return text
            .replace('--','')
            .replaceAll('"','')
            .trim();

}


 