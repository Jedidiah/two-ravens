const LocaleDate = (props: { dateString: string }) => {
  const date = new Date(props.dateString);
  const shortDate = date.toLocaleDateString();
  const longDate = date.toISOString();

  return <time title={longDate}>{shortDate}</time>;
};

export default LocaleDate;
