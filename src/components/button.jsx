export default function Button({ 
    children, 
    onClick, 
    variant = 'default',
    className = '',
    ...props 
  }) {
    const baseStyles = 'flex items-center gap-2 rounded-md transition-colors duration-200 active:scale-95';
    
    const variants = {
      default: 'bg-white hover:bg-gray-50 shadow-lg p-2 active:bg-blue-300',
      primary: 'bg-blue-600 hover:bg-blue-700 text-white p-2',
      danger: 'text-red-500 hover:text-red-600'
    }
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }