import React from 'react'

function test() {
    return (
        <div>
            <Button> Fetch Data</Button>

            <Stack gap={2}>
                <Button as="a" variant="primary">
                    Button as link
                </Button>
                <Button as="a" variant="success">
                    Button as link
                </Button>
            </Stack>

            <div>
                <h1>
                    Example heading{' '}
                    <Badge bg="secondary" as="Button">
                        New
                    </Badge>
                </h1>
            </div>


            <Alert dismissible variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again.
                </p>
            </Alert>


            <Stack direction="horizontal" gap={3}>
                <div className="bg-light border">First item</div>
                <div className="bg-light border ms-auto">Second item</div>
                <div className="bg-light border">Third item</div>
            </Stack>


            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="secondary">Save changes</Button>
                <Button variant="outline-secondary">Cancel</Button>
            </Stack>


            <Stack direction="horizontal" gap={3}>
                <Form.Control className="me-auto" placeholder="Add your item here..." />
                <Button variant="secondary">Submit</Button>
                <div className="vr" />
                <Button variant="outline-danger">Reset</Button>
            </Stack>
        </div>
    )
}

export default test

