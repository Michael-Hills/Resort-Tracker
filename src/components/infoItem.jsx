import PropTypes from 'prop-types';

export default function InfoItem({ title, text }) {
  return (
    <div className="border border-gray-300 text-gray-500 rounded-lg pr-4 pb-2 pl-2 w-fit sm:w-60">
      <h2 className="text-xs sm:text-base">{title}</h2>
      <p className="text-base sm:text-lg text-center text-black pl-1">
        {text}
      </p>
    </div>
  );
}

InfoItem.propTypes = {
  title: PropTypes.string.isRequired, 
  text: PropTypes.string.isRequired, 
};