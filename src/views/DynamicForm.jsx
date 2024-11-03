import { useEffect, useState } from 'react';
import { getDataInputs } from '../helpers/getTemplateInputs';
import { Alert, Button, CircularProgress, Container } from '@mui/material';

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);



  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await getDataInputs();
        setFormFields(response.template.attributes);
      } catch (error) {
        console.error('Error al obtener los campos:', error);
      }
    };
    fetchFormFields();
  }, []);

  useEffect(() => {
    if (formFields.length > 0) {
      const initialValues = formFields.reduce((acc, field) => {
        acc[field.friendlyName] = field.defaultValue;
        return acc;
      }, {});
      setFormValues(initialValues);
    }
  }, [formFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const newErrors = {};
    formFields.forEach(field => {
      if ((field.mandatory === "true") && !formValues[field.friendlyName]) {
        newErrors[field.friendlyName] = 'Este campo es obligatorio';
        setLoading(false);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setTimeout(() => {
        // Simulación de envío
        setLoading(false);
        setAlert(true);
      },[1500])

      setTimeout(() => {
        setAlert(false);
      },[3500])
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.friendlyName}>
            <label>
              {field.friendlyName} {(field.mandatory === "true") && <span>*</span>}
              <input
                value={formValues[field.friendlyName]}
                type={field.fieldType === "number" ? "text" : field.fieldType}
                name={field.friendlyName}
                onChange={handleChange}
                required={field.mandatory === "true"}
                style={{
                  backgroundColor: 'white', // Change the background color
                  color: 'black', // Text color
                  border: '1px solid #ccc', // Border style
                  padding: '8px', // Padding for better spacing
                  borderRadius: '4px', // Rounded corners
                  marginTop: '4px',
                  marginBottom: '12px',
                  width: '100%', // Full width
                }}
              />
            </label>
            {errors[field.friendlyName] && <span style={{ color: 'red' }}>{errors[field.friendlyName]}</span>}
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Enviando...' : 'Enviar Formulario'}
        </Button>
      </form>
      {
        alert &&
        <Alert severity="success">
          FORMULARIO ENVIADO CORRECTAMENTE.
        </Alert>
      }
    </Container>
  );
};

export default DynamicForm;
