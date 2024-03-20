"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input1 } from "../ui/input";
import Cn from "../util/cn";
import { Select1 } from "./select";
import { Textarea1 } from "./textarea";
import axios from "axios";
interface Entry {
  username: string;
  codeLanguage: string;
  stdin: string;
  sourceCode: string;
  timestamp: string;
}
export default function SignupFormDemo() {
  
  const [username, setUsername] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('C++');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const entry: Entry = { username, codeLanguage, stdin, sourceCode, timestamp: new Date().toLocaleString() };
    
        axios.post('http://localhost:3000/submit', entry)
          .then(() => {
            setUsername('');
            setStdin('');
            setSourceCode('');
            setCodeLanguage('')
          })
          .catch(error => console.error('Error submitting entry:', error));
          window.location.reload();
      };
  return (
    <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-gradient-to-r from-slate-900 to-sky-800 pt-16 pb-12">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Striver's SDE Inter Hiring Task
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter the information in the following fields
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="username">Username</Label>
              <Input1  id="username" placeholder="Tyler" type="text" onChange={(e)=>{
                setUsername(e.target.value)
              }}/>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Preferred Code Language</Label>
              <Select1 onChange={(e)=>{
                setCodeLanguage(e.target.value)
              }}></Select1>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="Std in">Standard Input</Label>
            <Input1 id="Std in" placeholder="Inputs" type="text" onChange={(e)=>{
                setStdin(e.target.value)
              }}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="Code">Code here</Label>
            <Textarea1 onChange={(e)=>{
                setSourceCode(e.target.value)
              }}></Textarea1>
          </LabelInputContainer>
          <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={Cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
