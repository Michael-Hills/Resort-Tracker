import PropTypes from 'prop-types';

export default function InfoItem({ title, text }) {
  return (
    <div className="border border-gray-300 text-gray-500 rounded-lg pr-4 pb-4 pl-2 w-32 sm:w-40 h-16 sm:h-24">
      <h2 className="text-sm sm:text-base">{title}</h2>
      <p className="text-base sm:text-lg text-center mt-2 text-black">
        {text}
      </p>
    </div>
  );
}

InfoItem.propTypes = {
  title: PropTypes.string.isRequired, 
  text: PropTypes.string.isRequired, 
};