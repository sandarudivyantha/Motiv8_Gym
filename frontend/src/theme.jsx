// import { createTheme } from '@mui/material/styles';

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2E7D32', // Gym green
//     },
//     secondary: {
//       main: '#D32F2F', // Accent red
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//     h4: {
//       fontWeight: 700,
//       color: '#2E7D32'
//     }
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           borderRadius: '8px'
//         }
//       }
//     }
//   }
// });


import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A9D8F',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E76F51',
    },
    background: {
      default: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#2A9D8F',
            color: '#fff',
          },
        },
      },
    },
  },
});