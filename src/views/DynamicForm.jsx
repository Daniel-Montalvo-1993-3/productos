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
    // Llamado a lafuncion que obtiene el template de los inputs
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
    // Inicializacion de valores por defecto basados en la peticion 
    if (formFields.length > 0) {
      const initialValues = formFields.reduce((acc, field) => {
        acc[field.friendlyName] = field.defaultValue;
        return acc;
      }, {});
      setFormValues(initialValues);
    }
  }, [formFields]);

  const handleChange = (e) => {
    // Funcion que setea los valores de los inputs cuando cambian
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    // Funcion que determina si los campos son correctos y estan llenos, si no hay error simula el envio de los inputs
    setLoading(true);
    e.preventDefault();
    const newErrors = {};
    // Se verifica si hay errores en los inputs 
    formFields.forEach(field => {
      if ((field.mandatory === "true") && !formValues[field.friendlyName]) {
        newErrors[field.friendlyName] = 'Este campo es obligatorio';
        setLoading(false);
      }
    });
    // Su hay errores se muestran al usuario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setTimeout(() => {
        // Simulación de envío correcto
        setLoading(false);
        setAlert(true);
      },[1500])
      // Simulacion de que termino el proceso y se quita la alerta de success
      setTimeout(() => {
        setAlert(false);
      },[3500])
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {/* Creacion de los inputs mediante los datos de la peticion */}
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
                  backgroundColor: 'white', 
                  color: 'black', 
                  border: '1px solid #ccc', 
                  padding: '8px', 
                  borderRadius: '4px',
                  marginTop: '4px',
                  marginBottom: '12px',
                  width: '100%',
                }}
              />
            </label>
            {/* Aqui se mostrara los errores de  los inpus si es que hay alguno */}
            {errors[field.friendlyName] && <span style={{ color: 'red' }}>{errors[field.friendlyName]}</span>}
          </div>
        ))}
        {/* Boton para el envio del formulario */}
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
      {/* Alerta que se muestra una vez enviado el formulario correctamente */}
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
