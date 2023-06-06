import React, { useState, useEffect } from "react";
import { DataArray, DataPoint } from "../types/data";
import { AxiosResponse } from "axios";
import axiosClient from "../router/apiClient";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";
import { Form, ListGroup } from "react-bootstrap";

interface ScoresProps {
  explanations: number[];
  mutagData?: DataArray;
  selectedId: String;
  checkboxState: any;
}

const ComputeScores: React.FC<ScoresProps> = ({
  explanations,
  mutagData,
  selectedId,
  checkboxState,
}) => {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  //let scores = {};
  let mol: DataPoint = {
    x: [],
    edge_index: [],
    y: [],
    idx: [],
    edge_attr: [],
    adj_padded: [],
    x_padded: [],
  };
  if (mutagData) {
    mol = mutagData[Number(selectedId)];
  }

  useEffect(() => {
    if (Object.values(mol.edge_index).length > 0) {
      if (mol.edge_index[0].length === explanations.length) {
        const res = {
          edge_mask: explanations,
          data: mol,
          focus: checkboxState.focus,
          mask_nature: checkboxState.mask_nature,
        };
        axiosClient
          .post("/evaluate", res)
          .then((response: AxiosResponse) => {
            // Handle the response from the server
            //console.log(response.data);
            setScores(response.data);
            // ...
          })
          .catch((error: Error) => {
            // Handle any errors that occurred during the request
            console.error(error);
          });
      }
    }
  }, [explanations, mol]);

  return (
    <div>
      <p className="card-category">
        The faithfulness is captured by the fidelity scores. These metrics tell
        if the explanation is necesssary, sufficient or both a characterization
        of the true label/model prediction.
      </p>
      <p style={{ fontSize: "0.8rem", color: "grey" }}>
        Move the mouse on an explanation aspect and learn more about the score
        definitions.{" "}
      </p>
      <ListGroup>
        <ListGroupItem>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", minWidth: "80px" }}>
              <Form.Label
                style={{ marginRight: "10px", minWidth: "150px" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="An explanation is necessary if the model prediction changes when you remove it from the initial graph. A necessary explanation has a Fidelity+ score close to 1."
              >
                Necessary explanation: {scores["fidelity_acc+"]}
              </Form.Label>
            </span>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", minWidth: "80px" }}>
              <Form.Label
                style={{ marginRight: "10px", minWidth: "150px" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="An explanation is sufficient if the explanatory subgraph preserves the input label/the model prediction. A sufficent explanation has a (1-Fidelity-) score close to 1."
              >
                Sufficient explanation: {1 - scores["fidelity_acc-"]}
              </Form.Label>
            </span>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", minWidth: "80px" }}>
              <Form.Label
                style={{ marginRight: "10px", minWidth: "150px" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="The characterization score captures both the necessary and sufficient aspects of the explanation. It summarizes Fidelity+ and Fidelity- measures."
              >
                Characterization: {scores["charact_prob"]}
              </Form.Label>
            </span>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default ComputeScores;
