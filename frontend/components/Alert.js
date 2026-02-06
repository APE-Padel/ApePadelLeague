import Snackbar from '@mui/material/Snackbar';
import MUIAlert from '@mui/material/Alert';

export default function Alert({ severity, isOpen, setIsOpen, message }) {
	const handleClose = () => setIsOpen(false);

	return (
		<Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
			<MUIAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{message}
			</MUIAlert>
		</Snackbar>
	);
}