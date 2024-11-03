import { Button, Typography, Paper, Container, Collapse } from '@mui/material';
import { useState } from 'react';
import { Accordion } from 'flowbite-react';
import { TbBrandDjango } from "react-icons/tb";
import { FaReact } from 'react-icons/fa';
import { SiReacthookform } from "react-icons/si";
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import React from 'react';

const customTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: "divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700",
      flush: {
        off: "rounded-lg border",
        on: "border-b",
      },
    },
    content: {
      base: "p-4 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900",
    },
    title: {
      arrow: {
        base: "h-6 w-6 shrink-0",
        open: {
          on: "rotate-180",
        },
      },
      base: "flex w-full items-center justify-between p-3 text-left font-medium text-gray-500 first:rounded-t-lg last:rounded-b-lg dark:text-gray-400",
      flush: {
        off: "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
        on: "bg-transparent dark:bg-transparent",
      },
      open: {
        on: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white",
      },
    },
  },
};

export default function SourceCode() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAccordion = () => setIsOpened(!isOpened);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-[#f0f4f8]">
        <Typography variant="h5" component="h2" className="text-center font-bold mb-4">
          Contribute to the Source Code
        </Typography>
        <Typography variant="body1" className="text-center mb-4">
          We welcome contributions to the source code of this project. If you have any suggestions or improvements, please feel free to submit a pull request on our GitHub repository.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={toggleAccordion}
          sx={{
            padding: '10px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            textTransform: 'none',
            backgroundColor: isOpened ? '#1976d2' : '#0d6efd',
            "&:hover": {
              backgroundColor: isOpened ? '#0d6efd' : '#1976d2',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          {isOpened ? "Hide Details" : "I am all in!"}
        </Button>
        <Collapse in={isOpened} timeout={500}>
          <Flowbite theme={{ theme: customTheme }}>
            <div className="mt-4">
              <Accordion collapseAll>
                <Accordion.Panel >
                  <Accordion.Title><div className='flex flex-row items-center justify-center'><FaReact style={{ color: "blue" }}/> Frontend </div></Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      The frontend of this project is built using React, a popular JavaScript library for building user interfaces.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      The source code for the frontend can be found on our <a href="https://github.com/miniloda/AI4GHI-Challenge" className="text-cyan-600 hover:underline dark:text-cyan-500" rel="noopener" target="_blank">GitHub repository</a>.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel className="p-4 border border-gray-200 rounded-lg shadow-md mt-2">
                  <Accordion.Title> <div className='flex flex-row'><TbBrandDjango /> Backend </div></Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      The backend of this project is built using Django, a high-level Python web framework that encourages rapid development and clean, pragmatic design.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Unfortunately, the repository for the backend is currently private. If you are interested in contributing to the backend, please reach out to us.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel className="p-4 border border-gray-200 rounded-lg shadow-md mt-2">
                  <Accordion.Title><SiReacthookform /> Documentation</Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      The documentation for this project is built using Markdown, a lightweight markup language with plain-text formatting syntax.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      We are still students and don&apos;t have either time or resources to create a full documentation. Almost all of the code/logic implementation have no documentation. If you are interested in contributing to the documentation, please reach out to us.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </Flowbite>
          
        </Collapse>
      </Paper>
    </Container>
  );
}
