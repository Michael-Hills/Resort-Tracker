import PropTypes from 'prop-types';
import InfoItem from './infoItem';

export default function InfoItemSection({ items }) {
  return (
    <div className="flex flex-wrap justify-start gap-2 sm:gap-10 mt-2 max-w-6xl mx-auto px-4">
      {items.map((item, index) => (
        <InfoItem
          key={index}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  );
}

InfoItemSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
};