import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import { useLocation } from 'react-router-dom';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
    ? '#e6e6fa'
    : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
  }

  
  export default function CustomizedBreadcrumbs() {
    const { pathname } = useLocation();
    let breadcrumb;

    if (pathname.includes("/detailed-view")) {
      breadcrumb = (
        <Breadcrumbs>
          <StyledBreadcrumb
            component={Link}
            to="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb component="a" href="/detailed-view" label="Detailed View" />
        </Breadcrumbs>
      );
    } else {
      breadcrumb = (
        <Breadcrumbs>
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
        </Breadcrumbs>
      );
    }
    
    console.log("Breadcrumbs!!!", pathname);
    return (
      <div role="presentation" onClick={handleClick}>
   
      {breadcrumb}

      </div>
    );
  };
