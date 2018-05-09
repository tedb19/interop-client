import React from "react";
import { Card, Icon } from "semantic-ui-react";

const CardExtra = props => {
  const iconName = props.address ? "signal" : "cancel";
  const iconColor = props.address ? "green" : "red";
  const address = props.address ? props.address : "Not Provided";

  return (
    <div>
      <Icon name={iconName} color={iconColor} />
      {address}
    </div>
  );
};

export const AddressCard = props => {
  const protocolDescriptions = {
    http:
      "This should be a POST endpoint on the participating system. The IL will be doing an HTTP POST to this address.",
    tcp:
      "This should be a TCP port where the participating system will be listening on. IL will be sending the messages to this port."
  };

  const extra = <CardExtra address={props.address} />;

  const addressAvailable = [
    {
      header: `${props.addressType} Address`,
      description:
        props.addressType === "HTTP"
          ? protocolDescriptions.http
          : protocolDescriptions.tcp,
      meta: `Last Updated On ${props.lastUpdated}`,
      extra,
      color: "teal",
      icon: "checkmark"
    }
  ];

  const addressMissing = [
    {
      header: `Address`,
      description: `This system will be marked as INACTIVE, and wont feature on the dashboard until a valid address is provided`,
      meta: `Last Updated On ${props.lastUpdated}`,
      extra,
      color: "red"
    }
  ];

  const items = props.address ? addressAvailable : addressMissing;

  return <Card.Group className="address-card-group" items={items} />;
};
