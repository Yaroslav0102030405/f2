import { useState } from "react";
import { Mail, User, Lock, Phone } from "lucide-react";
import "./App.css";

// Інтерфейс для даних форми
interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Інтерфейс для об'єкта помилок
interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function App() {
  // Стан для даних форми
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Стан для помилок валідації
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Валідація fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Повне ім'я є обов'язковим";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Повне ім'я має містити щонайменше 3 символи";
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = "Повне ім'я занадто довге";
    }

    // Валідація phoneNumber
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Номер телефону є обов'язковим";
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Введіть коректний номер телефону";
    }

    // Валідація email - додано .trim() для обробки пробілів
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    // Валідація password
    if (formData.password.length < 6) {
      newErrors.password = "Пароль має містити щонайменше 6 символів";
    }

    // Валідація confirmPassword та перевірка на відповідність паролю
    if (formData.confirmPassword.length < 6) {
      newErrors.confirmPassword = "Підтвердження пароля є обов'язковим";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 2. Очищаємо попереднє повідомлення про успіх
    setSuccessMessage("");
    // 3. Встановлюємо стан відправки в true, щоб, наприклад, вимкнути кнопку
    setIsSubmitting(true);

    // 4. Встановлюємо стан відправки в true, щоб, наприклад, вимкнути кнопку
    const validationErrors = validate();
    // 5. Оновлюємо стан помилок, щоб відобразити їх у формі
    setErrors(validationErrors);

    // 6. Перевіряємо, чи немає помилок валідації
    if (Object.keys(validationErrors).length === 0) {
      // 7. Виводимо дані форми в консоль для налагодження
      console.log("Form data submitted:", formData);
      try {
        // 8. Початок блоку для імітації відправки даних на сервер
        // 9. Чекаємо 1.5 секунди, щоб імітувати затримку сервера
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // 10. Встановлюємо повідомлення про успішну відправку даних
        setSuccessMessage("Дані успішно відправлено!");
        // 11. Очищаємо дані форми
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        // 12. Перехоплення і обробка можливих помилок при відправці
        console.error("Submission failed:", error);
        // 13. Встановлюємо повідомлення про помилку
        setSuccessMessage("Помилка відправки.");
      }
    } else {
      // 14. Якщо є помилки валідації, повертаємо стан відправки в false
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-wrapper">
          <h1 className="form-title">Відправка даних</h1>
          <p className="form-description">
            Заповніть форму для відправки даних на сервер.
          </p>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="fullName" className="input-label">
                Повне ім'я
              </label>
              <div className="input-field-icon-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input-field ${errors.fullName ? "error" : ""}`}
                  placeholder="Повне ім'я"
                />
              </div>
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phoneNumber" className="input-label">
                Номер телефону
              </label>
              <div className="input-field-icon-wrapper">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`input-field ${errors.phoneNumber ? "error" : ""}`}
                  placeholder="Номер телефону"
                  autoComplete="tel"
                />
              </div>
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <div className="input-field-icon-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? "error" : ""}`}
                  placeholder="Email"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Пароль
              </label>
              <div className="input-field-icon-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? "error" : ""}`}
                  placeholder="Пароль"
                  autoComplete="new-password"
                />
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">
                Підтвердження пароля
              </label>
              <div className="input-field-icon-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field ${
                    errors.confirmPassword ? "error" : ""
                  }`}
                  placeholder="Підтвердження пароля"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting && Object.keys(errors).length === 0
                ? "Відправка..."
                : "Відправити дані"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
