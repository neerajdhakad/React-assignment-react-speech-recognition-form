import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../../src/App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function Add() {
  const initialValues = {
    firstName: "",
    lastName: "",
    state: "",
    district: "",
    village: "",
    panCard: "",
    aadhaarNumber: 0,
  };
  const [listeningFields, setListeningFields] = useState({
    firstName: false,
    lastName: false,
    state: false,
    district: false,
    village: false,
    panCard: false,
    aadhaarNumber: false,
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleChange = (event, field) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormValues : ",formValues);
    const addUser = formValues;
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addUser),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      setFormValues(initialValues);
      navigate("/all")
    }
  };

  //react-speech-recognition

  const startListeningField = async (field) => {
    await SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setListeningFields({ ...listeningFields, [field]: true });
  };
  
  const stopListeningField = async (field) => {
    await SpeechRecognition.stopListening();
    setListeningFields({ ...listeningFields, [field]: false });
  };

  const { transcript, resetTranscript ,browserSupportsSpeechRecognition } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleSpeechButton = (field) => {
    if (listeningFields[field]) {
      stopListeningField(field);
    } else {
      startListeningField(field);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (transcript) {
      const activeField = Object.keys(listeningFields).find(
        (key) => listeningFields[key]
      );
      if (activeField) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [activeField]: transcript,
        }));
        resetTranscript();
      }
    }
  }, [transcript, listeningFields,resetTranscript]);


  return (
    <>
      <div className="flex justify-center">
        <div className="w-96">
          <h1 className="text-3xl font-bold mt-3 mb-6">Address Details</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            
            <div className="mb-4 flex flex-col">
              <label htmlFor="firstName" className="mb-1">
                First Name
              {listeningFields.firstName && <p style={{color:'green'}}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Swapnil"
                  id="firstName"
                  onChange={(event) => handleChange(event, 'firstName')}
                  value={formValues.firstName}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
                
                <button
                className={`rounded-r-lg px-3 py-1 ${
                    listeningFields.firstName ? "bg-green-600" : "bg-gray-600"
                } text-white shrink-0`}
                onClick={() => handleSpeechButton('firstName')}
              >
                <img
                  src="/icons/mic-white.svg"
                  alt=""
                  height="24px"
                  width="24px"
                  color="#ffffff"
                />
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="lastName" className="mb-1">
                Last Name
                {listeningFields.lastName && <p style={{color:'green'}}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Nikumbh"
                  id="lastName"
                  value={formValues.lastName}
                  onChange={(event) => handleChange(event, 'lastName')}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
                <button
                className={`rounded-r-lg px-3 py-1 ${
                    listeningFields.lastName ? "bg-green-600" : "bg-gray-600"
                } text-white shrink-0`}
                onClick={() => handleSpeechButton('lastName')}
              >
                <img
                  src="/icons/mic-white.svg"
                  alt=""
                  height="24px"
                  width="24px"
                  color="#ffffff"
                />
              </button>
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="state" className="mb-1">
                State
                {listeningFields.state && <p style={{ color: 'green' }}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  placeholder="Madhya Pradesh"
                  type="text"
                  id="state"
                  value={formValues.state}
                  onChange={(event) => handleChange(event, 'state')}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
                <button
                  className={`rounded-r-lg px-3 py-1 ${
                    listeningFields.state ? "bg-green-600" : "bg-gray-600"
                  } text-white shrink-0`}
                  onClick={() => handleSpeechButton('state')}
                >
                  <img
                    src="/icons/mic-white.svg"
                    alt=""
                    height="24px"
                    width="24px"
                    color="#ffffff"
                  />
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="district" className="mb-1">
                District
                {listeningFields.district && <p style={{color:'green'}}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  placeholder="Bhopal"
                  type="text"
                  id="district"
                  value={formValues.district}
                  onChange={(event) => handleChange(event, 'district')}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
                <button
            className={`rounded-r-lg px-3 py-1 ${
              listeningFields.district ? "bg-green-600" : "bg-gray-600"
            } text-white shrink-0`}
            onClick={() => handleSpeechButton('district')}
          >
            <img
              src="/icons/mic-white.svg"
              alt=""
              height="24px"
              width="24px"
              color="#ffffff"
            />
          </button>
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="village" className="mb-1">
                Village
                {listeningFields.village && <p style={{color:'green'}}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  placeholder="Rantanpur"
                  type="text"
                  id="village"
                  value={formValues.village}
                  onChange={(event) => handleChange(event, 'village')}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
             <button
            className={`rounded-r-lg px-3 py-1 ${
              listeningFields.village ? "bg-green-600" : "bg-gray-600"
            } text-white shrink-0`}
            onClick={() => handleSpeechButton('village')}
          >
            <img
              src="/icons/mic-white.svg"
              alt=""
              height="24px"
              width="24px"
              color="#ffffff"
            />
          </button>
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="panCard" className="mb-1">
                Pan card
                {listeningFields.panCard && <p style={{color:'green'}}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  placeholder="FSFSFSP21N"
                  type="text"
                  id="panCard"
                  value={formValues.panCard}
                  onChange={(event) => handleChange(event, 'panCard')}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="aadhaarNumber" className="mb-1">
                Aadhaar Card Number
                {listeningFields.aadhaarNumber && <p style={{color:'green'}}>Recording...</p>}
              </label>
              <div className="flex">
                <input
                  placeholder="212145348976"
                  type="number"
                  id="aadhaarNumber"
                  value={formValues.aadhaarNumber}
                  onChange={(event) => handleChange(event, 'aadhaarNumber')}
                  className="w-full border border-black/10 rounded-l-lg px-3 py-3 outline-none duration-150 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add User
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
