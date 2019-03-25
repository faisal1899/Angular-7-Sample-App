export interface IAppSnackBarData {
  message: string;
  type?: type;
}

type type = 'success' | 'error' | 'info';
