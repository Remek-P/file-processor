// import React from 'react';
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("Error occurred:", error, errorInfo);
//   }
//   handleFileRemoval = () => {
//     this.setState({ hasError: false });
//     this.props.onRemoveFile();  // Usunięcie błędnego pliku
//   };
//   render() {
//     if (this.state.hasError) {
//       return (
//           <div>
//             <h2>Wystąpił błąd przy ładowaniu pliku.</h2>
//             <button onClick={this.handleFileRemoval}>Usuń błędny plik</button>
//           </div>
//       );
//     }
//     return this.props.children;
//   }
// }
// export default ErrorBoundary;
