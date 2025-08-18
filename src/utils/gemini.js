// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

const gemini = new GoogleGenerativeAI(GEMINI_KEY); 

export default gemini;
