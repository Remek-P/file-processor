import ShowHideChartButton from "@/components/output/section/show-hide-chart-button/show-hide-chart-button";
import { Tile } from "@carbon/react";
import { useState } from "react";


import classes from "../section-module.module.scss";

function SectionLayout({ index,
                         value,
                         children,
                         chartType,
}) {

  const [showChart, setShowChart] = useState(false);

  const buttonIcon = showChart ? "–" : "+";

  const handleShowChart = () => {
    setShowChart(prevState => !prevState)
  }

  return (
      <Tile className={`optionContainer optionContainer${index} shadow`}
            onDoubleClick={handleShowChart}
            style={{cursor: "pointer"}}>

        <div className={classes.buttonContainer}>
          <h4>{value}</h4>
          <ShowHideChartButton onClick={handleShowChart}>
            { buttonIcon }
          </ShowHideChartButton>
        </div>

        { children }

        {
            showChart && chartType
        }
      </Tile>
        );
}

export default SectionLayout;