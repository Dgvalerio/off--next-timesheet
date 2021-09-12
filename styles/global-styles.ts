import { createGlobalStyle } from 'styled-components';

const global = createGlobalStyle`
   .Toastify__toast {
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  .Toastify__toast-body {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .Toastify__toast--error {
    color: rgb(250, 179, 174);
    border: 1px solid ${({ theme }) => theme.palette.error.dark};

    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.error.dark};
    }

    .Toastify__progress-bar {
      background-color: ${({ theme }) => theme.palette.error.dark};
    }
  }

  .Toastify__toast--warning {
    color: rgb(255, 213, 153);
    border: 1px solid ${({ theme }) => theme.palette.warning.dark};

    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.warning.dark};
    }

    .Toastify__progress-bar {
      background-color: ${({ theme }) => theme.palette.warning.dark};
    }
  }

  .Toastify__toast--info {
    color: rgb(166, 213, 250);
    border: 1px solid ${({ theme }) => theme.palette.info.dark};

    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.info.dark};
    }

    .Toastify__progress-bar {
      background-color: ${({ theme }) => theme.palette.info.dark};
    }
  }

  .Toastify__toast--success {
    color: rgb(183, 223, 185);
    border: 1px solid ${({ theme }) => theme.palette.success.dark};

    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.success.dark};
    }

    .Toastify__progress-bar {
      background-color: ${({ theme }) => theme.palette.success.dark};
    }
  }
`;

export default global;
