"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';

export default function UserCard() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    setUser(data.results[0]);
  };

  return (
    <div className="container mt-4">
      <Button color="primary" onClick={fetchUser}>
        Obtener Usuario Aleatorio
      </Button>

      {user && (
        <Card className="mt-3">
          <CardHeader>
            {user.name.title} {user.name.first} {user.name.last}
          </CardHeader>
          <CardBody>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Edad:</strong> {user.dob.age}</p>
            <p><strong>Género:</strong> {user.gender}</p>
            <p><strong>Teléfono:</strong> {user.phone}</p>
          </CardBody>
          <CardFooter>
            {user.location.street.name} {user.location.street.number}, {user.location.city}, {user.location.country}, CP: {user.location.postcode}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
